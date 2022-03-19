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

// const isKeyExist = (req: Request) => {
//   Object.keys(req.body).forEach(value => {
//     if (!Note.hasOwnProperty(value)) console.log(value);
//   });
// };

const notes: Note[] = [];

app.get('/note/:id', function (req: Request, res: Response) {
  const { id } = req.params;

  if (notes.some((note) => note.id === +id)) {
    let note = notes.filter((note) => {
      return note.id === +id;
    });
    res.send(note);
  } else{
    res.status(404).send({
      error: `Note not found`,
    });
  }
});

app.post('/note', function (req: Request, res: Response) {
  const note: Note = req.body; // nie muszę parsować na JSON
  const title = note.title;
  const content = note.content;

  if (title === undefined) {
    res.status(404).send({
      error: `Please, enter a title`,
    });
  }
  if (content === undefined) {
    res.status(404).send({
      error: `Please, enter a title`,
    });
  } else {
    // It returns the number of milliseconds between 1 January 1970 00:00:00 UTC and the given date as the contents of the Date() constructor.
    note.id = new Date().valueOf();
    notes.push(note);
    res.status(201).send(note);
  }
});

app.listen(3000);
