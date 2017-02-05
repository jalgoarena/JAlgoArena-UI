// @flow

export default class TestCase {
    input: Array<any>;
    output: any;

    constructor(input: Array<any>,
                output: any) {
        this.input = input;
        this.output = output;
    }
}

