const express = require('express');
const app = express();

import { Request, Response } from 'express';
import { checkRequired } from '../service';
import { secret, tags, notes, users, service } from '../index';
import { Tag } from '../models/Tag';
import Note from '../models/Note';
import { isAuth } from '../models/User';
import { type } from 'os';

const router = express.Router();
app.use(express.json());

module.exports = router;

router.get('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const note = notes.find((note) => {
    return note.id === id;
  });

  checkRequired(note, res, 'Note not found', 404);
  if (isAuth(req, res, secret)) {
    res.status(200).send(note);
  } else {
    note?.private === false
      ? res.status(200).send(note)
      : res.status(404).send({
          error: 'Note is private',
        });
  }
});

router.post('', (req: Request, res: Response) => {
  const note: Note = req.body;
  const tag: Tag = req.body.tags;
  const currentUser = isAuth(req, res, secret);

  checkRequired(note.title, res, 'Please, enter a title', 400);
  checkRequired(note.content, res, 'Please, enter a content', 400);

  const name = (tag.name = tag.name.toLowerCase());
  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    const user = users.find((user) => {
      return user.login === currentUser;
    });
    tag.id = new Date().valueOf();
    tags.push(tag);
    service.updateStorage();
    note.id = new Date().valueOf();
    notes.push(note);
    service.updateStorage();

    if (isAuth(req, res, secret) && typeof currentUser === 'string'){
      note.private == true;
      user?.notesId?.push(note.id);
      note.author = currentUser;
      console.log(users);
      service.updateStorage();
    } else {
      note.private == false;
    }

    res.status(201).send(note);
  }
});
router.put('/:id', function (req: Request, res: Response) {
  let note: Note = req.body;
  const tag: Tag = req.body.tags;
  let noteBefore = notes.find((e) => e.id === +req.params.id);

  checkRequired(note.title, res, 'Please, enter a title', 404);
  checkRequired(note.content, res, 'Please, enter a content', 404);
  checkRequired(noteBefore, res, 'Note not found', 404);

  isAuth(req, res, secret);

  const name = (tag.name = tag.name.toLowerCase());
  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tag.id = new Date().valueOf();
    tags.push(tag);
    service.updateStorage();
    noteBefore = Object.assign(noteBefore, note);
    service.updateStorage();
    res.status(201).send(noteBefore);
  }
});
router.delete('/:id', function (req: Request, res: Response) {
  const note = notes.find((e) => e.id === +req.params.id);
  checkRequired(note, res, 'Note not found', 400);

  isAuth(req, res, secret);

  notes.splice(
    notes.findIndex((note) => note.id === +req.params.id),
    1
  );
  service.updateStorage();
  res.status(204).send(note);
});
