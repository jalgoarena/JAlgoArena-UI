// @flow

export default class User {
    username: string;
    password: string;
    email: string;
    region: string;
    team: string;
    firstname: string;
    surname: string;
    role: ?string;
    id: ?string;

    constructor(
        username: string,
        password: string,
        email: string,
        region: string,
        team: string,
        firstname: string,
        surname: string,
        role: ?string,
        id: ?string
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.region = region;
        this.team = team;
        this.firstname = firstname;
        this.surname = surname;
        this.role = role;
        this.id = id;
    }
}
