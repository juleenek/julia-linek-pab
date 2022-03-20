import express from 'express';
import { Request, Response } from 'express';
// import uniqid from 'uniqid';

const app = express();

app.use(express.json()); // praca z JSONem

// Przyklad parsowania którego teraz nie muszę robić
// const jsonNote = JSON.stringify(note);

const currDate = new Date();

class Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: string[];
  id?: number;

  constructor(note: Note) {
    // Pakuje do obiektu - przykład z konwersatorium
    this.title = note.title;
    this.content = note.content;
    this.createDate = note.createDate;
    this.tags = note.tags;
    this.id = note.id;
  }
}

// That function check required fields
const checkRequired = (toCheck: any, res: Response, message: string) => {
  if (toCheck === undefined) {
    res.status(404).send({
      error: message,
    });
  }
};

// const isKeyExist = (req: Request) => {
//   Object.keys(req.body).forEach(value => {
//     if (!Note.hasOwnProperty(value)) console.log(value);
//   });
// };

const notes: Note[] = [];

app.get('/note/:id', function (req: Request, res: Response) {
  const { id } = req.params;
  const note = notes.find((note) => {
    return note.id === +id;
  });

  checkRequired(note, res, 'Note not found');
  res.status(200).send(note);
});

app.post('/note', function (req: Request, res: Response) {
  const note: Note = req.body; // nie muszę parsować na JSON

  checkRequired(note.title, res, 'Please, enter a title');
  checkRequired(note.content, res, 'Please, enter a content');

  // It returns the number of milliseconds between 1 January 1970 00:00:00 UTC and the given date as the contents of the Date() constructor.
  note.id = new Date().valueOf();
  notes.push(note);
  res.status(201).send(note);
});

app.put('/note/:id', function (req: Request, res: Response) {
  let note: Note = req.body;
  let noteBefore = notes.find(e => e.id === +req.params.id);

  checkRequired(note.title, res, 'Please, enter a title');
  checkRequired(note.content, res, 'Please, enter a content');
  checkRequired(noteBefore, res, 'Note not found');

  // https://javascript.info/object-copy
  noteBefore = Object.assign(noteBefore, note);

  res.status(201).send(noteBefore);
});

app.delete('/note/:id', function (req: Request, res: Response) {

  const note = notes.find(e => e.id === (+req.params.id));
  checkRequired(note, res, 'Note not found');

  notes.splice(notes.findIndex(note => note.id === (+req.params.id)), 1)
  res.status(204).send(note);
  
});

app.listen(3000);
