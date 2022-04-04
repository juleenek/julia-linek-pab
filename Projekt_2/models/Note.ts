import Tag from "./Tag";

class Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: Tag[];
  id?: number;

  constructor(note: Note) {
    // Pakuje do obiektu - przykład z konwersatorium
    this.title = note.title;
    this.content = note.content;
    this.createDate = note.createDate;
    this.tags = note.tags;
    this.id = note.id;
  }
}

export default Note;

// { 
//   "title": "abc",
//   "content": "abcabc",
//   "tags": {"name": "abcd"}
// }