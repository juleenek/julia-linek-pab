import Note from './Note';
import {Tag} from './Tag';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class User {
  login: string;
  password: string;
  id?: number;
  notesId?: number[];

  constructor(user?: User) {
    if(user) {
      this.login = user.login;
      this.password = user.password;
      this.notesId = user.notesId;
  } else {
      this.login = '';
      this.password = '';
      this.notesId = [];
  }
  }
}

export const isAuth = (req: Request, res: Response, secret: string) => {

  const authData = req.headers['authorization'];
  if (!authData) throw Error("Authorization header not found");
  const token = authData?.split(' ')[1] ?? '';
  const payload = jwt.verify(token, secret);
  if(payload) return payload;
};

// osobny plik dla admina

// const authData = req.headers.authorization
// const token = authData?.split(' ')[1] ?? ''
// const payload = jwt.verify(token, secret)
// @types/jsonwebtoken
// sekcja headers -> wartość Bearer token

// Pytania:
// 1) Jak debugować?
// 2) Uniwersalne read i update
// 3) Dodawanie id notatek i tagów a token

// ToDo:
// Ref - tag already exists fun

// ROUTE

// app,use(/note, nroute)
// route.put(/:id)
// notes => note/list - najpierw, sztywny get