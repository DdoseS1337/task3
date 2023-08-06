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
import { NoteModel } from '../model/note.model';
import { StatsNotes } from '../interface/stats.interface';
import { createNoteSchema, updateNoteSchema } from '../schema/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAllNotes(): Promise<NoteModel[]> {
    return this.notesService.getAllNotes();
  }

  @Get('/stats')
  async getStats(): Promise<StatsNotes> {
    return this.notesService.getStats();
  }

  @Get('/:id')
  async getNoteById(@Param('id') id: string): Promise<NoteModel> {
    const noteId = parseInt(id, 10);
    return this.notesService.getNoteById(noteId);
  }

  @Post()
  async createNote(@Body() createNoteDto: NoteModel): Promise<NoteModel> {
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
    @Body() updateNoteDto: NoteModel,
  ): Promise<NoteModel> {
    try {
      await updateNoteSchema.validate(updateNoteDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const noteId = parseInt(id, 10);
    return this.notesService.updateNote(noteId, updateNoteDto);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<boolean> {
    const noteId = parseInt(id, 10);
    return this.notesService.deleteNote(noteId);
  }
}
