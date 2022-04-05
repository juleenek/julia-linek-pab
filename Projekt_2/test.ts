// import express from 'express';
// import fs from 'fs';
// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import Note from '../Projekt_2/Note';
// import Tag from '../Projekt_2/Tag';
// import User from '../Projekt_2/User';

// const app = express();

// const storeNoteFile = '../Projekt_2/data/storeNotes.json';
// const storeTagFile = '../Projekt_2/data/storeTags.json';
// let notes: Note[] = [];
// let tags: Tag[] = [];

// app.use(express.json()); // praca z JSONem

// const service = new Service2();
// service.readStorage(notes, storeNoteFile);
// service.readStorage(tags, storeTagFile);

// // That function check required fields
// const checkRequired = (
//   toCheck: any,
//   res: Response,
//   message: string,
//   errNum: number
// ) => {
//   if (toCheck === undefined) {
//     res.status(errNum).send({
//       error: message,
//     });
//   }
// };

// /////////////////// CRUDE NOTE ///////////////////

// export default notes;

// app.get('/note/:id', function (req: Request, res: Response) {
//   const id = +req.params.id;
//   const note = notes.find((note) => {
//     return note.id === id;
//   });

//   checkRequired(note, res, 'Note not found', 404);
//   res.status(200).send(note);
// });

// app.get('/notes', function (req: Request, res: Response) {
//   res.status(200).send(notes);
// });

// app.post('/note', function (req: Request, res: Response) {
//   const note: Note = req.body; // nie muszę parsować na JSON
//   const tag: Tag = req.body.tags;

//   checkRequired(note.title, res, 'Please, enter a title', 400);
//   checkRequired(note.content, res, 'Please, enter a content', 400);


//   const name = (tag.name = tag.name.toLowerCase());
//   if (tags.some((tag) => tag.name === name)) {
//     res.status(404).send({
//       error: 'Tag already exist',
//     });
//   } else {
//     tag.id = new Date().valueOf();
//     tags.push(tag);
//     service.updateStorage(tags,storeTagFile);
//     note.id = new Date().valueOf();
//     notes.push(note);
//     service.updateStorage(notes, storeNoteFile);
//     res.status(201).send(note);
//   }
// });

// app.put('/note/:id', function (req: Request, res: Response) {
//   let note: Note = req.body;
//   const tag: Tag = req.body.tags;
//   let noteBefore = notes.find((e) => e.id === +req.params.id);

//   checkRequired(note.title, res, 'Please, enter a title', 404);
//   checkRequired(note.content, res, 'Please, enter a content', 404);
//   checkRequired(noteBefore, res, 'Note not found', 404);

//   const name = (tag.name = tag.name.toLowerCase());
//   if (tags.some((tag) => tag.name === name)) {
//     res.status(404).send({
//       error: 'Tag already exist',
//     });
//   } else {
//     tag.id = new Date().valueOf();
//     tags.push(tag);
//     service.updateStorage(tags, storeTagFile);
//     // https://j...content-available-to-author-only...t.info/object-copy
//     noteBefore = Object.assign(noteBefore, note);
//     service.updateStorage(notes, storeNoteFile);
//     res.status(201).send(noteBefore);
//   }
// });

// app.delete('/note/:id', function (req: Request, res: Response) {
//   const note = notes.find((e) => e.id === +req.params.id);
//   checkRequired(note, res, 'Note not found', 400);

//   notes.splice(
//     notes.findIndex((note) => note.id === +req.params.id),
//     1
//   );
//   res.status(204).send(note);
// });

// ///////////////////// CRUDE TAG /////////////////////

// app.get('/tag/:id', function (req: Request, res: Response) {
//   const id = +req.params.id;
//   const tag = tags.find((tag) => {
//     return tag.id === id;
//   });

//   checkRequired(tag, res, 'Note not found', 404);
//   res.status(200).send(tag);
// });

// app.get('/tags', function (req: Request, res: Response) {
//   res.status(200).send(tags);
// });

// app.post('/tag', function (req: Request, res: Response) {
//   const tag: Tag = req.body;

//   checkRequired(tag.name, res, 'Please, enter a tag name', 400);

//   tag.id = new Date().valueOf();
//   const name = (tag.name = tag.name.toLowerCase());

//   if (tags.some((tag) => tag.name === name)) {
//     res.status(404).send({
//       error: 'Tag already exist',
//     });
//   } else {
//     tags.push(tag);
//     service.updateStorage(tags, storeTagFile);
//     res.status(201).send(tag);
//   }
// });

// app.put('/tag/:id', function (req: Request, res: Response) {
//   let tag: Tag = req.body;
//   let tagBefore = tags.find((e) => e.id === +req.params.id);

//   checkRequired(tag.name, res, 'Please, enter a title', 404);
//   checkRequired(tagBefore, res, 'Note not found', 404);

//   const name = (tag.name = tag.name.toLowerCase());

//   if (tags.some((tag) => tag.name === name)) {
//     res.status(404).send({
//       error: 'Tag already exist',
//     });
//   } else {
//     tagBefore = Object.assign(tagBefore, tag);
//     service.updateStorage(tags,storeTagFile);
//     res.status(201).send(tagBefore);
//   }
// });

// app.delete('/tag/:id', function (req: Request, res: Response) {
//   const tag = tags.find((e) => e.id === +req.params.id);
//   checkRequired(tag, res, 'Note not found', 400);

//   tags.splice(
//     tags.findIndex((tag) => tag.id === +req.params.id),
//     1
//   );
//   res.status(204).send(tag);
// });

// ///////////////////// LOGIN USER /////////////////////

// const isAuth = (req: Request, res: Response, secret: string) => {
//   try {
//     const authData = req.headers['authorization'];
//     if (!authData) throw new Error('You need to log in');
//     const token = authData?.split(' ')[1] ?? '';
//     const payload = jwt.verify(token, secret) as {login: string};
//     if (payload) {
//       return payload.login;
//     }
//   } catch (error) {
//     res.status(401).send(error);
//   }
//  };

// let users = [
//   {
//     login: 'wiesiek123',
//     password: 'lubiemietka',
//   },
//   {
//     login: 'mietek123',
//     password: 'ajchemlem',
//   },
// ];

// app.post('/login', function (req: Request, res: Response) {
//   const user: User = req.body;

//   checkRequired(user.login, res, 'Please, enter a login', 400);
//   checkRequired(user.password, res, 'Please, enter a password', 400);

//   user.id = new Date().valueOf();
//   const payload = user.login;
//   const secret = user.password;

//   // https://www.geeksforgeeks.org/how-to-create-and-verify-jwts-with-node-js/

//   let isPresent = false;
//   let isPresnetIndex = null;

//   for (let i = 0; i < users.length; i++) {
//     if (users[i].login === payload && users[i].password === secret) {
//       isPresent = true;
//       // Store the data index
//       isPresnetIndex = i;
//       break;
//     }
//   }
//   if (isPresent) {
//     // Create token
//     const token = jwt.sign(payload, secret);
//     // res.json({
//     //   login: true,
//     //   token: token,
//     //   data: user,
//     // });
//     res.status(200).send(token);
//   } else {
//     res.status(401).send({
//       error: 'Please check name and password.',
//     });
//   }
// });

// app.listen(3000);

// // const authData = req.headers.authorization
// // const token = authData?.split(' ')[1] ?? ''
// // const payload = jwt.verify(token, secret)
// // @types/jsonwebtoken
// // sekcja headers -> wartość Bearer token
