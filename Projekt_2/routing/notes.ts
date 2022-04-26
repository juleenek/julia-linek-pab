const express = require('express');
import { isAuth } from '../models/User';
import { secret } from '../index';
const app = express();

import { Request, Response } from 'express';
import { DefaultDeserializer } from 'v8';
import { notes, users } from '../index';

const router = express.Router();
app.use(express.json());

module.exports = router;

router.get('', (req: Request, res: Response) => {
    res.status(200).send(notes.filter((n) => n.private === false));
});
router.get('/user/:userName', (req: Request, res: Response) => {
  const login = req.params.userName;
  console.log(isAuth(req, res, secret));
  if (isAuth(req, res, secret)) {
    isAuth(req, res, secret);
    const user = users.find((user) => {
      return user.login === login;
    });
    if (user) {
      res.status(200).send(notes.filter((n) => n.private === true));
    } else {
      res.status(404).send({
        error: 'There is no such user.',
      });
    }
  } else {
    res.status(404).send({
      error: 'Please, log in.', 
    });
  }
});