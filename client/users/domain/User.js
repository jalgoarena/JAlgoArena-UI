// @flow

export default class User {
    username: string;
    password: string;
    email: string;
    region: string;
    team: string;
    role: ?string;
    id: ?string;

    constructor(
        username: string,
        password: string,
        email: string,
        region: string,
        team: string,
        role: ?string,
        id: ?string
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.region = region;
        this.team = team;
        this.role = role;
        this.id = id;
    }
}
