import { findAdjIndex, interpolate, isConverged } from "./utils.js";
import { plateMats, fluidProps, calConstants } from "../utils/constants.js";

function rating(input) {
    const { plate, fluid, flow } = input;
    let { plateMat: mat, plateThick: t, plateEnlarge: Phi, plateBeta: beta, platePitch: p,
        plateLength: L_p, plateWidth: L_w, plateNum: N_t, platePortDisV: L_v, platePortDia: D_p,
        plateCond: k_given } = plate;
    let { fluidTypeH: fluidH, fluidTypeC: fluidC, fluidInTempC: T_i_c, fluidInTempH: T_i_h,
        fluidMRateH: m_h, fluidMRateC: m_c, fluidFoulingH: R_h_given, fluidFoulingC: R_c_given } = fluid;
    let { flowPassH: N_p_h, flowPassC: N_p_c } = flow;

    // check all numerical not empty
    if (![t, Phi, beta, p, L_p, L_w, N_t, L_v, D_p, T_i_c, T_i_h, m_h, m_c, N_p_h, N_p_c].every(val=>val)){
        return {ok: false};
    }

    // convert to number
    [t, Phi, beta, p, L_p, L_w, N_t, L_v, D_p, k_given, T_i_c, T_i_h, m_h, m_c, R_h_given, R_c_given, N_p_h, N_p_c] =
        [t, Phi, beta, p, L_p, L_w, N_t, L_v, D_p, k_given, T_i_c, T_i_h, m_h, m_c, R_h_given, R_c_given, N_p_h, N_p_c].map(Number);

    // get from properties and constants
    // 1 get fluid properties
    const propsC = fluidProps[fluidC];
    const propsH = fluidProps[fluidH];
    // if fluid not valid, fails
    if (!propsC || !propsH){
        return {ok: false};
    }
    // 2 get constant based on beta first since beta dont change during iter
    let iBeta;
    if (beta <= calConstants.beta[0]) iBeta = [0];
    else if (beta >= calConstants.beta[calConstants.beta.length - 1])
        iBeta = [calConstants.beta.length - 1];
    else {
        iBeta = findAdjIndex(calConstants.beta, beta)
    }
    let iBetaUsed;
    if (iBeta.length == 1) {
        iBetaUsed = iBeta[0];
    } else {
        // if beta is in between, choose the one closer
        if (beta - calConstants.beta[iBeta[0]] <= calConstants.beta[iBeta[1]] - beta) {
            // closer to left
            iBetaUsed = iBeta[0];
        } else {
            iBetaUsed = iBeta[1];
        }
    }
    // 3 get plate conductivity
    const k_p = k_given || plateMats[mat];
    // if k_p not valid, calculation fails
    if (!k_p){
        return {ok: false};
    }
    // 4 get fouling factor
    const R_c = R_c_given || propsC.R;
    const R_h = R_h_given || propsH.R;

    // Section 1: Config
    const b = (p - t) / 1000;
    const D_h = 2 * b / Phi;
    const A_1p = L_p * L_w;
    const A_1 = A_1p * Phi;
    const N_e = N_t - 2;
    const A_t = A_1 * N_e;

    // Mass velocity
    const N_cp_h = (N_t - 1) / (2 * N_p_h);
    const N_cp_c = (N_t - 1) / (2 * N_p_c);
    const G_c_h = m_h / (N_cp_h * b * L_w);
    const G_c_c = m_c / (N_cp_c * b * L_w);

    // Save results
    const resConfig = {
        "k_p": k_p,
        "R_c": R_c,
        "R_h": R_h,
        "b": b,
        "D_h": D_h,
        "A_1p": A_1p,
        "A_1": A_1,
        "N_e": N_e,
        "A_t": A_t,
        "N_cp_h": N_cp_h,
        "N_cp_c": N_cp_c,
        "G_c_h": G_c_h,
        "G_c_c": G_c_c
    }

    // Section 2: Heat Transfer. Re, Nu, h
    // start iterate
    const resHeatTransfer = [];
    let T_o_c = T_i_c;
    let T_o_h = T_i_h;
    let T_o_c_res, T_o_h_res, Re_c, Re_h;
    // (converge: difference < 1%)
    let i = 0;
    while (true) {
        const T_mean_c = (T_o_c + T_i_c) / 2;
        const T_mean_h = (T_o_h + T_i_h) / 2;
        // get properties based on fluid type and mean temp
        // cold
        let mu_c, Cp_c, k_c, Pr_c;
        const indexC = findAdjIndex(propsC.t, T_mean_c);
        if (indexC.length == 1) {
            // temp in lists
            const index = indexC[0];
            mu_c = propsC.mu[index];
            Cp_c = propsC.Cp[index];
            k_c = propsC.k[index];
        }
        else {
            // temp is in between
            const [iLow, iHigh] = indexC;
            mu_c = interpolate(propsC.mu[iLow], propsC.mu[iHigh],
                propsC.t[iLow], propsC.t[iHigh], T_mean_c);
            Cp_c = interpolate(propsC.Cp[iLow], propsC.Cp[iHigh],
                propsC.t[iLow], propsC.t[iHigh], T_mean_c);
            k_c = interpolate(propsC.k[iLow], propsC.k[iHigh],
                propsC.t[iLow], propsC.t[iHigh], T_mean_c);
        }
        Pr_c = Cp_c * mu_c / k_c;
        // hot
        let mu_h, Cp_h, k_h, Pr_h;
        const indexH = findAdjIndex(propsH.t, T_mean_h);
        if (indexH.length == 1) {
            // temp in lists
            const index = indexH[0];
            mu_h = propsH.mu[index];
            Cp_h = propsH.Cp[index];
            k_h = propsH.k[index];
        }
        else {
            // temp is in between
            const [iLow, iHigh] = indexH;
            mu_h = interpolate(propsH.mu[iLow], propsH.mu[iHigh],
                propsH.t[iLow], propsH.t[iHigh], T_mean_h);
            Cp_h = interpolate(propsH.Cp[iLow], propsH.Cp[iHigh],
                propsH.t[iLow], propsH.t[iHigh], T_mean_h);
            k_h = interpolate(propsH.k[iLow], propsH.k[iHigh],
                propsH.t[iLow], propsH.t[iHigh], T_mean_h);
        }
        Pr_h = Cp_h * mu_h / k_h;

        // Calculate Re
        Re_c = G_c_c * D_h / mu_c;
        Re_h = G_c_h * D_h / mu_h;
        // retrive constants based on beta and Re
        let Ch_c, y_c, Ch_h, y_h;
        // cold
        let iRe = findAdjIndex(calConstants.heatTrans[iBetaUsed].Re, Re_c);
        let iReUsed;
        if (iRe.length == 1) {
            iReUsed = iRe[0];
        } else {
            iReUsed = iRe[1];
        }
        Ch_c = calConstants.heatTrans[iBetaUsed].Ch[iReUsed];
        y_c = calConstants.heatTrans[iBetaUsed].y[iReUsed];
        // hot
        iRe = findAdjIndex(calConstants.heatTrans[iBetaUsed].Re, Re_h);
        if (iRe.length == 1) {
            iReUsed = iRe[0];
        } else {
            iReUsed = iRe[1];
        }
        Ch_h = calConstants.heatTrans[iBetaUsed].Ch[iReUsed];
        y_h = calConstants.heatTrans[iBetaUsed].y[iReUsed];
        // Done retriving, cal Nu, h
        const Nu_c = Ch_c * Re_c ** y_c * Pr_c ** (1 / 3);
        const Nu_h = Ch_h * Re_h ** y_h * Pr_h ** (1 / 3);
        const h_c = Nu_c * k_c / D_h;
        const h_h = Nu_h * k_h / D_h;
        // Overall U, epsilon, Q
        const U_f = 1 / (1 / h_c + 1 / h_h + (t / 1000) / k_p + R_c + R_h);
        const C_c = Cp_c * m_c;
        const C_h = Cp_h * m_h;
        const C_min = Math.min(C_c, C_h), C_max = Math.max(C_c, C_h);
        const NTU = U_f * A_t / C_min;
        const R = C_min / C_max;
        const epsilon = (1 - Math.exp(-(1 - R) * NTU)) / (1 - R * Math.exp(-(1 - R) * NTU));
        const Q = epsilon * C_min * (T_i_h - T_i_c);
        // Outlet temp
        T_o_c_res = T_i_c + Q / C_c; // RES
        T_o_h_res = T_i_h - Q / C_h; // RES

        // Save this iteration's data
        resHeatTransfer.push({
            "T_o_c": T_o_c,
            "T_o_h": T_o_h,
            "T_mean_c": T_mean_c,
            "T_mean_h": T_mean_h,
            "mu_c": mu_c,
            "Cp_c": Cp_c,
            "k_c": k_c,
            "Pr_c": Pr_c,
            "mu_h": mu_h,
            "Cp_h": Cp_h,
            "k_h": k_h,
            "Pr_h": Pr_h,
            "Re_c": Re_c,
            "Re_h": Re_h,
            "Nu_c": Nu_c,
            "Nu_h": Nu_h,
            "h_c": h_c,
            "h_h": h_h,
            "U_f": U_f,
            "C_c": C_c,
            "C_h": C_h,
            "C_min": C_min,
            "C_max": C_max,
            "NTU": NTU,
            "R": R,
            "epsilon": epsilon,
            "Q": Q,
            "T_o_c_res": T_o_c_res,
            "T_o_h_res": T_o_h_res
        })

        if (isConverged(T_o_c, T_o_c_res) && isConverged(T_o_h, T_o_h_res)) {
            break;
        } else {
            T_o_c = T_o_c_res;
            T_o_h = T_o_h_res;
        }
        // break; // test
        i += 1;
        if (i > 10) {
            console.error("Rating iteration did not converge")
            break;
        }

    }
    // Calculate pressure drop

    // get ro based on final T_mean, Re
    const T_mean_c = (T_i_c + T_o_c_res) / 2;
    const T_mean_h = (T_o_h + T_o_h_res) / 2;
    let ro_c, ro_h;
    // cold
    const indexC = findAdjIndex(propsC.t, T_mean_c);
    if (indexC.length == 1) {
        // temp in lists
        const index = indexC[0];
        ro_c = propsC.ro[index];
    }
    else {
        // temp is in between
        const [iLow, iHigh] = indexC;
        ro_c = interpolate(propsC.ro[iLow], propsC.ro[iHigh],
            propsC.t[iLow], propsC.t[iHigh], T_mean_c);
    }
    // high
    const indexH = findAdjIndex(propsH.t, T_mean_h);
    if (indexH.length == 1) {
        // temp in lists
        const index = indexH[0];
        ro_h = propsH.ro[index];
    }
    else {
        // temp is in between
        const [iLow, iHigh] = indexH;
        ro_h = interpolate(propsH.ro[iLow], propsH.ro[iHigh],
            propsH.t[iLow], propsH.t[iHigh], T_mean_h);
    }

    // get constants based on beta and re
    // retrive constants based on beta and Re
    let Kp_c, z_c, Kp_h, z_h;
    // cold
    let iRe = findAdjIndex(calConstants.pLoss[iBetaUsed].Re, Re_c);
    let iReUsed;
    if (iRe.length == 1) {
        iReUsed = iRe[0];
    } else {
        iReUsed = iRe[1];
    }
    Kp_c = calConstants.pLoss[iBetaUsed].Kp[iReUsed];
    z_c = calConstants.pLoss[iBetaUsed].z[iReUsed];
    // hot
    iRe = findAdjIndex(calConstants.pLoss[iBetaUsed].Re, Re_h);
    if (iRe.length == 1) {
        iReUsed = iRe[0];
    } else {
        iReUsed = iRe[1];
    }
    Kp_h = calConstants.pLoss[iBetaUsed].Kp[iReUsed];
    z_h = calConstants.pLoss[iBetaUsed].z[iReUsed];

    // Calculate pressure drops
    // cold
    const f_c = Kp_c / Re_c ** z_c;
    const p_c_c = 4 * f_c * (L_v * N_p_c / D_h) * (G_c_c ** 2 / 2 / ro_c);
    const G_p_c = m_c / (Math.PI * D_p ** 2 / 4);
    const p_p_c = 1.4 * N_p_c * (G_p_c ** 2 / 2 / ro_c);
    const p_t_c = p_c_c + p_p_c; // RES
    // hot
    const f_h = Kp_h / Re_h ** z_h;
    const p_c_h = 4 * f_h * (L_v * N_p_h / D_h) * (G_c_h ** 2 / 2 / ro_h);
    const G_p_h = m_h / (Math.PI * D_p ** 2 / 4);
    const p_p_h = 1.4 * N_p_h * (G_p_h ** 2 / 2 / ro_h);
    const p_t_h = p_c_h + p_p_h; // RES

    // Save res
    const resPressure = {
        "ro_c": ro_c,
        "ro_h": ro_h,
        "Kp_c": Kp_c,
        "z_c": z_c,
        "Kp_h": Kp_h,
        "z_h": z_h,
        "p_c_c": p_c_c,
        "p_p_c": p_p_c,
        "p_t_c": p_t_c,
        "p_c_h": p_c_h,
        "p_p_h": p_p_h,
        "p_t_h": p_t_h
    }

    const res = {
        ok: true,
        config: resConfig,
        heatTransfer: resHeatTransfer,
        pressure: resPressure
    }
    // console.log(res);
    return res;

}
export { rating };