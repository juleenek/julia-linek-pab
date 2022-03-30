
class User {
  login: string;
  password: string;
  id?: number;

  constructor(user: User) {
    this.login = user.login;
    this.password = user.password;
    this.id = user.id;
  }
}

export default User;