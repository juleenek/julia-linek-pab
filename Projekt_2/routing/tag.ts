const express = require('express');
const app = express();

import { Request, Response } from 'express';
import { isAuth } from '../models/User';
import { checkRequired } from '../service';
import { secret } from '../index';
import { tags } from '../index';
import { Tag } from '../models/Tag';
import { service } from '../index';

const router = express.Router();
app.use(express.json());

module.exports = router;

router.get('/tag/:id', function (req: Request, res: Response) {
  const id = +req.params.id;
  isAuth(req, res, secret);
  const tag = tags.find((tag) => {
    return tag.id === id;
  });

  checkRequired(tag, res, 'Note not found', 404);
  res.status(200).send(tag);
});

router.get('/tags', function (req: Request, res: Response) {
  isAuth(req, res, secret);
  res.status(200).send(tags);
});

router.post('/tag', function (req: Request, res: Response) {
  const tag: Tag = req.body;

  checkRequired(tag.name, res, 'Please, enter a tag name', 400);
  isAuth(req, res, secret);

  tag.id = new Date().valueOf();
  const name = (tag.name = tag.name.toLowerCase());

  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tags.push(tag);
    service.updateTagStorage();
    res.status(201).send(tag);
  }
});

router.put('/tag/:id', function (req: Request, res: Response) {
  let tag: Tag = req.body;
  let tagBefore = tags.find((e) => e.id === +req.params.id);

  checkRequired(tag.name, res, 'Please, enter a title', 404);
  checkRequired(tagBefore, res, 'Note not found', 404);

  isAuth(req, res, secret);

  const name = (tag.name = tag.name.toLowerCase());

  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tagBefore = Object.assign(tagBefore, tag);
    service.updateTagStorage();
    res.status(201).send(tagBefore);
  }
});

router.delete('/tag/:id', function (req: Request, res: Response) {
  const tag = tags.find((e) => e.id === +req.params.id);
  checkRequired(tag, res, 'Note not found', 400);

  isAuth(req, res, secret);

  tags.splice(
    tags.findIndex((tag) => tag.id === +req.params.id),
    1
  );
  res.status(204).send(tag);
});