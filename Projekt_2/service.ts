import fs from 'fs';
import { Response } from 'express';


const storeNoteFile = '../Projekt_2/data/storeNotes.json';
const storeTagFile = '../Projekt_2/data/storeTags.json';

// That function check required fields
export const checkRequired = (
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