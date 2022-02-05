const cellObject = class {

    constructor(value, isExposed, output) {
        this.value = value;
        this.isExposed = isExposed;
        this.output = output;
    }
};

module.exports = new cellObject();