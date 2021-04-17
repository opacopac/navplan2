export class TextError implements Error {
    public name = 'TextError';
    public stack = undefined;


    constructor(public message: string) {
    }
}
