
const cellObject = class {
    value;
    isExposed;
    output;

    constructor(value, isExposed, output) {
        this.value = value;
        this.isExposed = isExposed;
        this.output = output;
    }
    getOutput() {
        return this.output;
    }

    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
};
module.exports = new cellObject();