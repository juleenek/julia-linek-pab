import express from 'express';
import { Request, Response } from 'express';
import  Note  from '../Projekt_2/Note'
// import uniqid from 'uniqid';

const app = express();

app.use(express.json()); // praca z JSONem

// Przyklad parsowania którego teraz nie muszę robić
// const jsonNote = JSON.stringify(note);

const currDate = new Date();

// That function check required fields
const checkRequired = (toCheck: any, res: Response, message: string, errNum: number) => {
  if (toCheck === undefined) {
    res.status(errNum).send({
      error: message,
    });
  }
};

const notes: Note[] = [];

app.get('/note/:id', function (req: Request, res: Response) {
  const { id } = req.params;
  const note = notes.find((note) => {
    return note.id === +id;
  });

  checkRequired(note, res, 'Note not found', 404);
  res.status(200).send(note);
});

app.post('/note', function (req: Request, res: Response) {
  const note: Note = req.body; // nie muszę parsować na JSON

  checkRequired(note.title, res, 'Please, enter a title', 400);
  checkRequired(note.content, res, 'Please, enter a content', 400);

  // It returns the number of milliseconds between 1 January 1970 00:00:00 UTC and the given date as the contents of the Date() constructor.
  note.id = new Date().valueOf();
  notes.push(note);
  res.status(201).send(note);
});

app.put('/note/:id', function (req: Request, res: Response) {
  let note: Note = req.body;
  let noteBefore = notes.find(e => e.id === +req.params.id);

  checkRequired(note.title, res, 'Please, enter a title', 404);
  checkRequired(note.content, res, 'Please, enter a content', 404);
  checkRequired(noteBefore, res, 'Note not found', 404);

  // https://javascript.info/object-copy
  noteBefore = Object.assign(noteBefore, note);

  res.status(201).send(noteBefore);
});

app.delete('/note/:id', function (req: Request, res: Response) {

  const note = notes.find(e => e.id === (+req.params.id));
  checkRequired(note, res, 'Note not found', 400);

  notes.splice(notes.findIndex(note => note.id === (+req.params.id)), 1)
  res.status(204).send(note);
  
});

app.listen(3000);
