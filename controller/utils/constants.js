// Plate Material
// Thermal conductivity, in W/m.K
const plateMats = {
    "Stainless Steel (ANSI 304)": 14.9,
    "Stainless Steel (ANSI 316)": 13.4,
    "Alloy 254SMO": 13,
    "Alloy C-276": 10.6,
    "Nickel": 90,
    "Nickel Alloy": 11.7,
    "Hastelloy": 10.6,
    "Titanium": 21.9,
    "Graphite": 5.7
}

// Fluid Properties
// Fluid: water, sea water, ethyl alcohol, lithium chloride, potasium formate, engine oil
// refrigerant-134a, milk
const fluidProps = {
    "Water": {
        t: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        ro: [1000, 999.7, 999.1, 998.2, 997.1, 995.7, 994, 992.2, 990.2, 988, 985.7, 983.2, 980.6, 977.8, 974.9, 971.8, 968.6, 965.3, 961.9, 0.5896],
        mu: [0.001519, 0.001307, 0.001138, 0.001002, 0.0008905, 0.0007977, 0.0007196, 0.0006533, 0.0005963, 0.0005471, 0.0005042, 0.0004666, 0.0004334, 0.000404, 0.0003779, 0.0003545, 0.0003335, 0.0003145, 0.0002974, 0.00001227],
        Cp: [4200, 4188, 4184, 4183, 4183, 4183, 4183, 4182, 4182, 4181, 4182, 4183, 4184, 4187, 4190, 4194, 4199, 4204, 4210, 2042],
        k: [0.5576, 0.5674, 0.5769, 0.5861, 0.5948, 0.603, 0.6107, 0.6178, 0.6244, 0.6305, 0.636, 0.641, 0.6455, 0.6495, 0.653, 0.6562, 0.6589, 0.6613, 0.6634, 0.02506],
        R: 0
    },
    "Sea Water": {
        t: [0, 10, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        ro: [1028, 1027, 1024.9, 1023.6, 1022, 1018.3, 1014, 1009, 1003.5, 997.5, 991, 984.2, 976.9, 969.3],
        mu: [0.001906, 0.001397, 0.001077, 0.000959, 0.000861, 0.000707, 0.000594, 0.000508, 0.000441, 0.000388, 0.000345, 0.000309, 0.00028, 0.000255],
        Cp: [3990.1, 3994.9, 3998.9, 4000.8, 4002.6, 4006.2, 4010, 4014.4, 4019.6, 4026, 4033.9, 4043.6, 4055.4, 4069.6],
        k: [0.5695, 0.5865, 0.6015, 0.6085, 0.6155, 0.628, 0.639, 0.6485, 0.657, 0.664, 0.67, 0.6745, 0.678, 0.6805],
        R: 0.000043
    },
    "Ethyl Alcohol Solution (60%)": {

        t: [40, 30, 20, 10, 0, -10, -20, -30, -40, -44.9],
        ro: [874.3, 882.7, 891.3, 899.3, 907.3, 915.5, 923.5, 931.7, 940, 943.7],
        mu: [0.00144, 0.00192, 0.00265, 0.00378, 0.00575, 0.00885, 0.0147, 0.0255, 0.055, 0.085],
        Cp: [3690, 3630, 3550, 3450, 3330, 3200, 3050, 2880, 2710, 2630],
        k: [0.28, 0.279, 0.278, 0.277, 0.276, 0.275, 0.274, 0.273, 0.272, 0.272],
        R: 0.00016
    },
    "Lithium Chloride Solution (23.3%)": {
        t: [40, 30, 20, 10, 0, -10, -20, -30, -40, -50, -60],
        ro: [1128, 1132, 1135, 1138, 1141, 1143, 1146, 1147, 1149, 1150, 1150],
        mu: [0.00166, 0.00201, 0.00251, 0.00323, 0.00433, 0.00602, 0.00875, 0.0133, 0.0213, 0.036, 0.0644],
        Cp: [3273, 3204, 3135, 3066, 2998, 2930, 2862, 2793, 2725, 2657, 2589],
        k: [0.569, 0.557, 0.544, 0.53, 0.517, 0.504, 0.491, 0.477, 0.464, 0.451, 0.438],
        R: 0.00016
    },
    "Potasium Formate Solution (48%)": {
        t: [40, 30, 20, 10, 0, -10, -20, -30, -40, -50],
        ro: [1316, 1321, 1326, 1330, 1335, 1338, 1342, 1345, 1348, 1350],
        mu: [0.00178, 0.00215, 0.00265, 0.00332, 0.0044, 0.0061, 0.092, 0.0148, 0.0265, 0.057],
        Cp: [2735, 2710, 2695, 2675, 2655, 2640, 2620, 2605, 2585, 2570],
        k: [0.517, 0.506, 0.495, 0.484, 0.472, 0.461, 0.449, 0.438, 0.426, 0.415],
        R: 0.00016
    },
    "Engine Oil": {
        t: [0, 7, 17, 27, 37, 47, 57, 67, 77, 87, 97, 107, 117, 127, 137, 147, 157],
        ro: [899.1, 895.3, 890, 884.1, 877.9, 871.8, 865.8, 859.9, 853.9, 847.8, 841.8, 836, 830.6, 825.1, 818.9, 812.1, 806.5],
        mu: [3.85, 2.17, 0.999, 0.486, 0.253, 0.141, 0.0836, 0.0531, 0.0356, 0.0252, 0.0186, 0.0141, 0.011, 0.00874, 0.00698, 0.00564, 0.0047],
        Cp: [1796, 1827, 1868, 1909, 1951, 1993, 2035, 2076, 2118, 2161, 2206, 2250, 2294, 2337, 2381, 2427, 2471],
        k: [0.147, 0.144, 0.145, 0.145, 0.145, 0.143, 0.141, 0.139, 0.138, 0.138, 0.137, 0.136, 0.135, 0.134, 0.133, 0.133, 0.132],
        R: 0.00003
    },
    "Refrigerant-134a": {
        t: [-43, -33, -23, -13, -3, 7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
        ro: [1426.8, 1397.7, 1367.9, 1337.1, 1305.1, 1271.8, 1236.8, 1199.7, 1159.9, 1116.8, 1069.1, 1015, 951.3, 870.1, 740.3],
        mu: [0.0004912, 0.0004202, 0.0003633, 0.0003166, 0.0002775, 0.0002443, 0.0002156, 0.0001905, 0.0001680, 0.0001478, 0.0001292, 0.0001118, 0.0000951, 0.0000781, 0.0000580],
        Cp: [1249, 1267, 1287, 1308, 1333, 1361, 1393, 1432, 1481, 1543, 1627, 1751, 1961, 2437, 5105],
        k: [0.1121, 0.1073, 0.1025, 0.0979, 0.0934, 0.089, 0.0846, 0.0803, 0.0761, 0.0718, 0.0675, 0.0631, 0.0586, 0.0541, 0.0518],
        R: 0.00025 
    },
    "Milk": {
        t: [20, 25, 30, 45, 60, 75],
        ro: [1029.6, 1028.2, 1025.9, 1020.2, 1013.1, 1003.9],
        mu: [2.5177, 2.0590, 1.6264, 1.1236, 0.9113, 0.5355],
        Cp: [3863, 3855, 3847, 3880, 3876, 3892],
        k: [0.5690, 0.5756, 0.5822, 0.6020, 0.6250, 0.6390],
        R: 0.0000864
    }

}

// LMTD correction factors
const LMTDFactors = {
    "1-1": function(NTU){
        // if (NTU > 0 && NTU < 4){
            return -0.0041*NTU*NTU - 0.0043*NTU + 1;
        // }
        // return false;
    },
    "2-1": function(NTU){
        // if (NTU > 0 && NTU < 5){
            return -0.0025*NTU*NTU - 0.0582*NTU + 0.9989;
        // }
        // return false;
    },
    "2-2": function(NTU){
        // if (NTU > 0 && NTU < 6){
            return -0.0036*NTU*NTU - 0.0121*NTU + 0.9999;
        // }
        // return false;
    },
    "3-1": function(NTU){
        // if (NTU > 0 && NTU < 7){
            return -0.0014*NTU*NTU - 0.0542*NTU + 1.0092;
        // }
        // return false;
    },
    "3-3": function(NTU){
        // if (NTU > 0 && NTU < 10){
            return -0.0007*NTU*NTU - 0.0167*NTU + 1.0145;
        // }
        // return false;
    },
    "4-1": function(NTU){
        // if (NTU > 0 && NTU < 9){
            return 0.0009*NTU*NTU - 0.0658*NTU + 1.0334;
        // }
        // return false;
    }
}

// Constants for heat transfer and pressure loss calculation
const calConstants = {
    beta: [30, 45, 50, 60, 65],
    heatTrans: [
        {
            Re: [10],
            Ch: [0.718, 0.348],
            y: [0.349, 0.663]
        },
        {
            Re: [10, 100],
            Ch: [0.718, 0.4, 0.3],
            y: [0.349, 0.598, 0.663]
        },
        {
            Re: [20, 300],
            Ch: [0.63, 0.291, 0.13],
            y: [0.333, 0.591, 0.732]
        },
        {
            Re: [20, 400],
            Ch: [0.562, 0.306, 0.108],
            y: [0.326, 0.529, 0.703]
        },
        {
            Re: [20, 500],
            Ch: [0.562, 0.331, 0.087],
            y: [0.326, 0.503, 0.718]
        }
        
    ],
    pLoss:[
        {
            Re:[10, 100],
            Kp:[50, 19.4, 2.99],
            z:[1, 0.589, 0.183]
        },
        {
            Re:[15, 300],
            Kp:[47, 18.29, 1.441],
            z:[1, 0.652, 0.206]
        },
        {
            Re:[20, 300],
            Kp:[34, 11.25, 0.772],
            z:[1, 0.631, 0.161]
        },
        {
            Re:[40, 400],
            Kp:[24, 3.24, 0.76],
            z:[1, 0.457, 0.215]
        },
        {
            Re:[50, 500],
            Kp:[24, 2.8, 0.639],
            z:[1, 0.451, 0.213]
        }

    ]
        
}

export {plateMats, fluidProps, LMTDFactors, calConstants};