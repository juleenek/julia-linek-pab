import Note from '../Projekt_2/Note';
import Tag from '../Projekt_2/Tag';

class User {
  login: string;
  password: string;
  notes: Note[];
  tags: Tag[];
  id?: number;

  constructor(user: User) {
    this.login = user.login;
    this.password = user.password;
    this.notes = user.notes;
    this.tags = user.tags;
    this.id = user.id;
  }
}

export default User;

// Zapisywanie danych w JSON:
// Notatki: UserId, {Note}
// Tagi: UserId, {Tag}