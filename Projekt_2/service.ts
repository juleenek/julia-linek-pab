import fs from 'fs';

export class Serviced {
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
