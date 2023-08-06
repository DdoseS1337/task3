import { Module } from '@nestjs/common';
import { NoteModule } from './module/note.module';

@Module({
  imports: [NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
