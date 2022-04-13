import {Tag} from "./Tag";

class Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: Tag[];
  id?: number;
  private: boolean;

  constructor(note: Note) {
    // Pakuje do obiektu - przykład z konwersatorium
    this.title = note.title;
    this.content = note.content;
    this.createDate = note.createDate;
    this.tags = note.tags;
    this.id = note.id;
    this.private = true; // domyślnie prywatna
  }
}

export default Note;

// { 
//   "title": "abc",
//   "content": "abcabc",
//   "tags": {"name": "abcd"}
// }