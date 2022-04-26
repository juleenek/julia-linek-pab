const express = require('express');
const app = express();

import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User} from '../models/User';
import { checkRequired } from '../service';
import { secret } from '../index';
import { users } from '../index';

const router = express.Router();
app.use(express.json());

module.exports = router;

router.post('', (req: Request, res: Response) => {
  const user: User = req.body;

  checkRequired(user.login, res, 'Please, enter a login', 400);
  checkRequired(user.password, res, 'Please, enter a password', 400);

  const payload = user.login;
  let isPresent = false;
  let isPresnetIndex = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].login === payload && users[i].password === secret) {
      isPresent = true;
      isPresnetIndex = i;
      break;
    }
  }
  if (isPresent && isPresnetIndex !== null) {
    const token = jwt.sign(payload, secret);
    // console.log(    users[isPresnetIndex]);
    res.status(200).send(token);
  } else {
    res.status(401).send({
      error: 'Please check name and password.',
    });
  }
});