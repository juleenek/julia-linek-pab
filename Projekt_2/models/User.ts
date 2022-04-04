import Note from './Note';
import Tag from './Tag';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class User {
  login: string;
  password: string;
  id?: number;
  notesId?: number[];
  tagsId?: number[];

  constructor(user: User) {
    this.login = user.login;
    this.password = user.password;
    this.id = user.id;
    this.notesId = user.notesId;
    this.tagsId = user.tagsId;
  }
}

export const isAuth = (req: Request, res: Response, secret: string) => {
  try {
    const authData = req.headers['authorization'];
    if (!authData) throw new Error('You need to log in');
    const token = authData?.split(' ')[1] ?? '';
    const payload = jwt.verify(token, secret) as { login: string };
    if (payload) {
      return payload.login;
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export let users: User[] = [
  {
    login: 'wiesiek',
    password: 'kot123',
  },
  {
    login: 'mietek',
    password: 'kruk123',
  },
];
