import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '../interface/note.interface';
import { mockedNotes } from '../mock/notes.mock';
import { StatsNotes } from 'src/interface/stats.interface';

@Injectable()
export class NotesService {
  private notes: Note[] = mockedNotes;

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  createNote(note: Note): Note {
    const newNote: Note = {
      ...note,
      id: this.notes.length + 1,
    };
    this.notes.push(newNote);
    return newNote;
  }

  updateNote(id: number, updateNoteDto: Partial<Note>): Note {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex === -1) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    const originalNote = this.notes[noteIndex];
    const updatedNote: Note = Object.assign({}, originalNote, updateNoteDto);

    this.notes[noteIndex] = updatedNote;
    return updatedNote;
  }

  deleteNote(id: number): boolean {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter((note) => note.id !== id);
    if (this.notes.length === initialLength) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return true;
  }

  getStats(): StatsNotes {
    const totalNotes = this.notes.length;

    const categoryCounts: { [key: string]: number } = {};
    this.notes.forEach((note) => {
      if (note.category in categoryCounts) {
        categoryCounts[note.category]++;
      } else {
        categoryCounts[note.category] = 1;
      }
    });
    return {
      totalNotes,
      categoryCounts,
    };
  }
}
