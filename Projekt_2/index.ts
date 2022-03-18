import express from 'express';
import { Request, Response } from 'express';

// npx tsc Projekt_2/index.ts
// node Projekt_2/index.js

const app = express();

app.use(express.json()); // praca z JSONem

const currDate = new Date();

class Note{

  id?: number = 0;
  title: string;
  content: string;
  createDate?: string;
  tags?: string[];

  constructor(note: Note){ // Pakuje do obiektu - przykład z konwersatorium 
    this.title = note.title;
    this.content = note.content;
    this.createDate = currDate.toISOString();
    this.tags = note.tags;
    this.id = note.id++;
  }
};

const notes: Note[] = []; // globalne przechowywanie notatek

app.get('/note', function (req: Request, res: Response) {
  // Przyklad parsowania
  // const jsonNote = JSON.stringify(note);

  res.send('GET Hello World');
  
});

app.post('/note', function (req: Request, res: Response) {
  // const title = req.body.title; -  nie muszę parsować JSONa
  if (res.status(200)) {
    console.log(req.body); // e.x. req.body.title
    res.send('POST Hello World');
  } else {
    res.status(404);
  }
});

app.listen(3000);
