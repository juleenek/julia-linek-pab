import fs from 'fs';
import { Request, Response } from 'express';

export class Service2 {
  public async updateStorage<ObjetcsArrayType>(
    arr: ObjetcsArrayType,
    storeFile: string
  ): Promise<void> {
    try {
      const data = { arr };
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