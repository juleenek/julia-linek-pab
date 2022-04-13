const express = require('express');
const app = express();
import { Request, Response } from 'express';
import { isAuth } from '../models/User';
import { checkRequired } from '../service';
import {notes} from '../index'
import {secret} from '../index'
import {tags} from '../index'
import {users} from '../index'
import Note from '../models/Note';
import { Tag } from '../models/Tag';


app.route('/note')
.get('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const note = notes.find((note) => {
    return note.id === id;
  });

  checkRequired(note, res, 'Note not found', 404);
  isAuth(req, res, secret);
  res.status(200).send(note);
})
.get('/list', (req: Request, res: Response) => {
  isAuth(req, res, secret)
    ? res.status(200).send(notes.filter((n) => n.private === true))
    : res.status(200).send(notes.filter((n) => n.private === false));
})
.post('', (req: Request, res: Response) => {
  const note: Note = req.body; // nie muszę parsować na JSON
  const tag: Tag = req.body.tags;

  checkRequired(note.title, res, 'Please, enter a title', 400);
  checkRequired(note.content, res, 'Please, enter a content', 400);

  const name = (tag.name = tag.name.toLowerCase());
  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tag.id = new Date().valueOf();
    tags.push(tag);
    // service.updateTagStorage();
    note.id = new Date().valueOf();
    notes.push(note);
    // service.updateNoteStorage();

    isAuth(req, res, secret) ? note.private == true : note.private == false;
    console.log(users);

    res.status(201).send(note);
  }
});