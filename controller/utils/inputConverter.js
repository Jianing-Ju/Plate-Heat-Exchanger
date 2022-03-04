export function flatten(inputs) {
    return Object.values(inputs).reduce((type, obj) => ({
        ...obj,
        ...type
    }), {});
}

export function unFlatten(inputs) {
    const formattedInput = { "plate": {}, "flow": {}, "fluid": {} };
    Object.keys(inputs).forEach(key => {
        if (key.search("plate") == 0) {
            formattedInput.plate[key] = inputs[key];
        } else if (key.search("flow") == 0) {
            formattedInput.flow[key] = inputs[key];
        } else if (key.search("fluid") == 0) {
            formattedInput.fluid[key] = inputs[key];
        }
    })
    return formattedInput;
}