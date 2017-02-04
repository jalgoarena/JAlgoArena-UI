// @flow

import Parameter from "./Parameter";
import Return from "./Return";

export default class Method {
    name: string;
    returnStatement: Return;
    parameters: Array<Parameter>;

    constructor(name: string,
                returnStatement: Return,
                parameters: Array<Parameter>) {
        this.name = name;
        this.returnStatement = returnStatement;
        this.parameters = parameters;
    }
}
