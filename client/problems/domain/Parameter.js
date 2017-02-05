// @flow

export default class Parameter {
    name: string;
    type: string;
    comment: string;
    generic: ?string;

    constructor(name: string,
                type: string,
                comment: string,
                generic: ?string) {
        this.name = name;
        this.type = type;
        this.comment = comment;
        this.generic = generic;
    }
}
