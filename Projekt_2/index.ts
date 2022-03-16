import express from 'express';
import { Request, Response } from 'express';

// npx tsc Projekt_2/index.ts
// node Projekt_2/index.js

const app = express();

app.use(express.json()); // praca z JSONem

let id = 0;

type Note = {
  title: string;
  content: string;
  createDate?: string; // string - data w formacie ISO
  tags?: string[];
  id?: number;
};

const notes: Note[] = []; // globalne przechowywanie notatek

app.get('/note', function (req: Request, res: Response) {
  // Przyklad parsowania
  // const jsonNote = JSON.stringify(note);

  res.send('GET Hello World');
});

app.post('/note', function (req: Request, res: Response) {
  // const title = req.body.title; -  nie muszę parsować JSONa
  const currDate = new Date();
  const note: Note = {
    id: id++,
    title: req.body.title,
    content: req.body.content,
    createDate: currDate.toISOString(),
    tags: req.body.tags,
  };

  notes.push(note);

  if (res.status(200)) {
    console.log(req.body); // e.x. req.body.title
    res.send('POST Hello World');
  } else {
    res.status(404);
  }
});

app.listen(3000);
