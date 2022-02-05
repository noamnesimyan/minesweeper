const setParams = (input,position) => {
    return parseInt(input.split(",")[position]);
}

exports.setParams = setParams;
