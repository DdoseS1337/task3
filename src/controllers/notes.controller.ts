import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../interface/note.interface';
import { createNoteSchema, updateNoteSchema } from '../schema/note.schema';
import { StatsNotes } from 'src/interface/stats.interface';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes(): Note[] {
    return this.notesService.getAllNotes();
  }

  @Get('/stats')
  getStats(): StatsNotes {
    return this.notesService.getStats();
  }

  @Get('/:id')
  getNoteById(@Param('id') id: string): Note {
    const noteId = parseInt(id, 10);
    return this.notesService.getNoteById(noteId);
  }

  @Post()
  async createNote(@Body() createNoteDto: Note): Promise<Note> {
    try {
      await createNoteSchema.validate(createNoteDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return this.notesService.createNote(createNoteDto);
  }

  @Patch('/:id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: Note,
  ): Promise<Note> {
    try {
      await updateNoteSchema.validate(updateNoteDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const noteId = parseInt(id, 10);
    return this.notesService.updateNote(noteId, updateNoteDto);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string): boolean {
    const noteId = parseInt(id, 10);
    return this.notesService.deleteNote(noteId);
  }
}
