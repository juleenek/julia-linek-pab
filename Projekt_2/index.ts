import express from 'express';
import fs from 'fs';
import { Request, Response } from 'express';
import Note from '../Projekt_2/Note';
import Tag from '../Projekt_2/Tag';

const app = express();
const storeFile = '../Projekt_2/data/storeFile.json';

let notes: Note[] = [];
let tags: Tag[] = [];

app.use(express.json()); // praca z JSONem

class Service{
  public async updateStorage(): Promise<void> {
    const data = { notes, tags };
    try {
      await fs.promises.writeFile(storeFile, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  public async readStorage(): Promise<void> {
    try {
      const data = await fs.promises.readFile(storeFile, 'utf-8');
      notes = JSON.parse(data).notes;
      tags = JSON.parse(data).tags;
    } catch (err) {
      console.log(err);
    }
  }
}

const service = new Service();
service.readStorage();

// That function check required fields
const checkRequired = (
  toCheck: any,
  res: Response,
  message: string,
  errNum: number
) => {
  if (toCheck === undefined) {
    res.status(errNum).send({
      error: message,
    });
  }
};

/////////////////// CRUDE NOTE ///////////////////

export default notes;

app.get('/note/:id', function (req: Request, res: Response) {
  const id = +req.params.id;
  const note = notes.find((note) => {
    return note.id === id;
  });

  checkRequired(note, res, 'Note not found', 404);
  res.status(200).send(note);
});

app.get('/notes', function (req: Request, res: Response) {
  res.status(200).send(notes);
});

app.post('/note', function (req: Request, res: Response) {
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
    note.id = new Date().valueOf();
    notes.push(note);
    service.updateStorage();
    res.status(201).send(note);
  }
});

app.put('/note/:id', function (req: Request, res: Response) {
  let note: Note = req.body;
  const tag: Tag = req.body.tags;
  let noteBefore = notes.find((e) => e.id === +req.params.id);

  checkRequired(note.title, res, 'Please, enter a title', 404);
  checkRequired(note.content, res, 'Please, enter a content', 404);
  checkRequired(noteBefore, res, 'Note not found', 404);

  const name = (tag.name = tag.name.toLowerCase());
  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tag.id = new Date().valueOf();
    tags.push(tag);
    // https://j...content-available-to-author-only...t.info/object-copy
    noteBefore = Object.assign(noteBefore, note);
    res.status(201).send(noteBefore);
  }
});

app.delete('/note/:id', function (req: Request, res: Response) {
  const note = notes.find((e) => e.id === +req.params.id);
  checkRequired(note, res, 'Note not found', 400);

  notes.splice(
    notes.findIndex((note) => note.id === +req.params.id),
    1
  );
  res.status(204).send(note);
});

///////////////////// CRUDE TAG /////////////////////

app.get('/tag/:id', function (req: Request, res: Response) {
  const id = +req.params.id;
  const tag = tags.find((tag) => {
    return tag.id === id;
  });

  checkRequired(tag, res, 'Note not found', 404);
  res.status(200).send(tag);
});

app.get('/tags', function (req: Request, res: Response) {
  res.status(200).send(tags);
});

app.post('/tag', function (req: Request, res: Response) {
  const tag: Tag = req.body;

  checkRequired(tag.name, res, 'Please, enter a tag name', 400);

  tag.id = new Date().valueOf();
  const name = (tag.name = tag.name.toLowerCase());

  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tags.push(tag);
    service.updateStorage();
    res.status(201).send(tag);
  }
});

app.put('/tag/:id', function (req: Request, res: Response) {
  let tag: Tag = req.body;
  let tagBefore = tags.find((e) => e.id === +req.params.id);

  checkRequired(tag.name, res, 'Please, enter a title', 404);
  checkRequired(tagBefore, res, 'Note not found', 404);

  const name = (tag.name = tag.name.toLowerCase());

  if (tags.some((tag) => tag.name === name)) {
    res.status(404).send({
      error: 'Tag already exist',
    });
  } else {
    tagBefore = Object.assign(tagBefore, tag);
    res.status(201).send(tagBefore);
  }
});

app.delete('/tag/:id', function (req: Request, res: Response) {
  const tag = tags.find((e) => e.id === +req.params.id);
  checkRequired(tag, res, 'Note not found', 400);

  tags.splice(
    tags.findIndex((tag) => tag.id === +req.params.id),
    1
  );
  res.status(204).send(tag);
});

app.listen(3000);
