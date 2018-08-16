export class User {
  public readonly username: string;
  public readonly password: string;
  public readonly email: string;
  public readonly region: string;
  public readonly team: string;
  public readonly firstname: string;
  public readonly surname: string;
  public readonly role: string | undefined;
  public readonly id: string | undefined;

  constructor(
    username: string,
    password: string,
    email: string,
    region: string,
    team: string,
    firstname: string,
    surname: string,
    role: string | undefined,
    id: string | undefined,
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
