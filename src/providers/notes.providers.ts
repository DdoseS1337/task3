import { NoteModel } from '../model/note.model';

export const notesProviders = [
  {
    provide: 'NOTES_REPOSITORY',
    useValue: NoteModel,
  },
];
