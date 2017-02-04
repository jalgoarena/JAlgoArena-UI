// @flow

export default class Return {
    type: string;
    comment: string;
    generic: ?string;

    constructor(type: string,
                comment: string,
                generic: ?string) {
        this.type = type;
        this.comment = comment;
        this.generic = generic;
    }
}
