import Note from './Note';
import {Tag} from './Tag';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class User {
  login: string;
  password: string;
  token?: string;
  id?: number;
  notesId?: number[];
  tagsId?: number[];

  constructor(user?: User) {
    if(user) {
      this.login = user.login;
      this.password = user.password;
      this.token = user.token;
      this.notesId = user.notesId;
      this.tagsId = user.tagsId;
  } else {
      this.login = '';
      this.password = '';
      this.token = '';
      this.notesId = [];
      this.tagsId = [];
  }
  }
}

export const isAuth = (req: Request, res: Response, secret: string) => {
  try {
    const authData = req.headers['authorization'];
    if (!authData) throw new Error('You need to log in');
    const token = authData?.split(' ')[1] ?? '';
    const payload = jwt.verify(token, secret) as { login: string };
    if (payload) {
      return token;
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export let user = new User({
  // eyJhbGciOiJIUzI1NiJ9.d2llc2llaw.D_YbfgYOQT8JCkVDUM-9x5qMOuRBx41BMQFOnPJu55w
  id: 123456789,
  login: 'wiesiek',
  password: 'kot123',
});

// export let users: User[] = [
//   {
//     // eyJhbGciOiJIUzI1NiJ9.d2llc2llaw.D_YbfgYOQT8JCkVDUM-9x5qMOuRBx41BMQFOnPJu55w
//     id: 12345,
//     login: 'wiesiek',
//     password: 'kot123',
//     notesId: [],
//     tagsId: []
//   },
//   {
//     id: 6789,
//     login: 'mietek',
//     password: 'kruk123',
//   }
// ];

// const authData = req.headers.authorization
// const token = authData?.split(' ')[1] ?? ''
// const payload = jwt.verify(token, secret)
// @types/jsonwebtoken
// sekcja headers -> wartość Bearer token