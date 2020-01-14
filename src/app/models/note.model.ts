export class Note {
  id: number;
  writer: number;
  type: number;
  typeID: number;
  text: string;
  lastUpdate: Date;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.writer = data.writer;
    this.type = data.type;
    this.typeID = data.type_id;
    this.text = data.text;
    this.lastUpdate = data.last_update;
    this.createdAt = data.created_at;
  }

  static arrayCast(data: any): Note [] {
    const notes: Note [] = [];
    data.data.forEach(noteItem => {
      const note = new Note(noteItem);
      notes.push(note);
    });
    return notes;
  }

  static getEmptyNote(): Note {
    return {
      id: null,
      writer: null,
      type: null,
      typeID: null,
      text: null,
      lastUpdate: null,
      createdAt: null,
    };
  }
}
