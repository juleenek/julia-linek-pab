import fs from 'fs';
import { Request, Response } from 'express';


const storeNoteFile = '../Projekt_2/data/storeNotes.json';
const storeTagFile = '../Projekt_2/data/storeTags.json';

export class Service2 {
  public async updateStorage<ObjetcsArrayType>(
    data: ObjetcsArrayType,
    storeFile: string
  ): Promise<void> {
    try {
      // data?
      await fs.promises.writeFile(storeFile, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  public async readStorage<ObjetcsArrayType>(
    arr: ObjetcsArrayType,
    storeFile: string
  ): Promise<void> {
    try {
      const data = await fs.promises.readFile(storeFile, 'utf-8');
      arr = JSON.parse(data).arr;
    } catch (err) {
      console.log(err);
    }
  }
}

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