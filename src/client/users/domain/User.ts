export class User {
    public readonly username: string;
    public readonly password: string;
    public readonly email: string;
    public readonly region: string;
    public readonly team: string;
    public readonly firstname: string;
    public readonly surname: string;
    public readonly id: string | null;

    constructor(
        username: string,
        password: string,
        email: string,
        region: string,
        team: string,
        firstname: string,
        surname: string,
        id: string | null,
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.region = region;
        this.team = team;
        this.firstname = firstname;
        this.surname = surname;
        this.id = id;
    }
}
