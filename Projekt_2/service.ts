import Tag from './Tag';
import Note from './Note';
import notes from './index';
import fs from 'fs';

export const findAllNotes = async (): Promise<void> => {
  try {
    const data = await fs.promises.readFile('notes.json', 'utf-8');
  } catch (err) {
    console.log(err);
  }
};

export const createNote = async (note: Note): Promise<void> => {
  try {
    await fs.promises.writeFile('data/notes.json', JSON.stringify(note));
  } catch (err) {
    console.log(err);
  }
};
