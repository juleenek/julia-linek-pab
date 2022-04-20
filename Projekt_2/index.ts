import express from 'express';
import fs from 'fs';
import { Request, Response } from 'express';
import { Tag } from './models/Tag';
import Note from './models/Note';
import { User } from './models/User';

const note = require('./routing/note');
const tag = require('./routing/tag');
const login = require('./routing/login');

const app = express();
app.use(express.json());

export let notes: Note[] = [];

const storeNoteFile = '../Projekt_2/data/storeNotes.json';
const storeTagFile = '../Projekt_2/data/storeTags.json';

export let tags: Tag[] = [];
export let users: User[] = [];
let user = new User();
users.push(user);
user.id = 123456789;
user.login = 'wiesiek';
export const secret = 'kot123';
user.password = secret;

export class Service {
  public async updateNoteStorage(): Promise<void> {
    const data = { notes };
    try {
      await fs.promises.writeFile(storeNoteFile, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  public async readNoteStorage(): Promise<void> {
    try {
      const data = await fs.promises.readFile(storeNoteFile, 'utf-8');
      notes = JSON.parse(data).notes;
    } catch (err) {
      console.log(err);
    }
  }
  public async updateTagStorage(): Promise<void> {
    // to do: parametry
    const data = { tags };
    try {
      await fs.promises.writeFile(storeTagFile, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  public async readTagStorage(): Promise<void> {
    try {
      const data = await fs.promises.readFile(storeTagFile, 'utf-8');
      tags = JSON.parse(data).tags;
    } catch (err) {
      console.log(err);
    }
  }
}

export const service = new Service();
service.readNoteStorage();
service.readTagStorage();

app.use('/note', note);
app.use('/tag', tag);
app.use('/login', tag);

app.listen(3000);
