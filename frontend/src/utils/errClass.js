export default class Err extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
