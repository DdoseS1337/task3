import { Module } from '@nestjs/common';
import { NotesController } from '../controllers/notes.controller';
import { NotesService } from '../services/notes.service';
import { DatabaseModule } from '../module/database.module';
import { notesProviders } from '../providers/notes.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [NotesService, ...notesProviders],
})
export class NoteModule {}
