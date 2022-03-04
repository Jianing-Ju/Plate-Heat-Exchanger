// return index(exact)/indexes(in between)
function findAdjIndex(values, target) {
    let l = 0, r = values.length - 1;
    while (l <= r) {
        const mid = Math.floor((r + l) / 2);
        if (target == values[mid]) return [mid];
        else if (target < values[mid]) r = mid - 1;
        else l = mid + 1;
    }
    return [r, l];
}

function interpolate(highValue, lowValue, highKey, lowKey, key) {
    return lowValue + (highValue - lowValue) * (key - lowKey) / (highKey - lowKey);
}

function isConverged(prev, curr) {
    return Math.abs(curr - prev) / prev < 0.01;
}

export {findAdjIndex, interpolate, isConverged};