import express from 'express';
import fs from 'fs';
import { Tag } from './models/Tag';
import Note from './models/Note';
import { User } from './models/User';

const noteRoute = require('./routing/note');
const notesRoute = require('./routing/notes');
const tagRoute = require('./routing/tag');
const loginRoute = require('./routing/login');

const app = express();
app.use(express.json());

export let notes: Note[] = [];
export let tags: Tag[] = [];
export let users: User[] = [];

const storeNoteFile = '../Projekt_2/data/storeNotes.json';
const storeTagFile = '../Projekt_2/data/storeTags.json';
const storeUserFile = '../Projekt_2/data/storeUsers.json';

export const secret = 'kot123';

export class Service {
  public async updateStorage(): Promise<void> {
    const dataNotes = { notes };
    const dataTags = { tags };
    const dataUsers = { users };
    try {
      await fs.promises.writeFile(storeNoteFile, JSON.stringify(dataNotes));
      await fs.promises.writeFile(storeTagFile, JSON.stringify(dataTags));
      await fs.promises.writeFile(storeUserFile, JSON.stringify(dataUsers));
    } catch (err) {
      console.log(err);
    }
  }
  public async readStorage(): Promise<void> {
    try {
      const dataNotes = await fs.promises.readFile(storeNoteFile, 'utf-8');
      const dataTags = await fs.promises.readFile(storeTagFile, 'utf-8');
      const dataUsers = await fs.promises.readFile(storeUserFile, 'utf-8');
      notes = JSON.parse(dataNotes).notes;
      tags = JSON.parse(dataTags).tags;
      users = JSON.parse(dataUsers).users;
    } catch (err) {
      console.log(err);
    }
  }
}

export const service = new Service();
service.readStorage();

app.use('/note', noteRoute);
app.use('/notes', notesRoute);
app.use('/tag', tagRoute);
app.use('/login', loginRoute);


app.listen(3000);
