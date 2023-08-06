import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NoteModel } from '../model/note.model';
import { StatsNotes } from 'src/interface/stats.interface';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private readonly noteModel: typeof NoteModel,
  ) {}

  async getAllNotes(): Promise<NoteModel[]> {
    return this.noteModel.findAll();
  }

  async getNoteById(id: number): Promise<NoteModel> {
    const note = await this.noteModel.findByPk(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async createNote(note: Partial<NoteModel>): Promise<NoteModel> {
    return await this.noteModel.create(note);
  }

  async updateNote(
    id: number,
    updateNoteDto: Partial<NoteModel>,
  ): Promise<NoteModel> {
    const [rowsUpdated, [updatedNote]] = await this.noteModel.update(
      updateNoteDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (rowsUpdated === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return updatedNote;
  }

  async deleteNote(id: number): Promise<boolean> {
    const rowsDeleted = await this.noteModel.destroy({
      where: { id },
    });

    if (rowsDeleted === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return true;
  }

  async getStats(): Promise<StatsNotes> {
    const totalNotes = await this.noteModel.count();

    const categoryCounts = await this.noteModel.findAll({
      attributes: [
        'category',
        [
          this.noteModel.sequelize.fn(
            'COUNT',
            this.noteModel.sequelize.col('category'),
          ),
          'count',
        ],
      ],
      group: ['category'],
    });

    const categoryCountsMap: { [key: string]: number } = {};
    categoryCounts.forEach((categoryCount: any) => {
      categoryCountsMap[categoryCount.category] = categoryCount.get('count');
    });

    return {
      totalNotes,
      categoryCounts: categoryCountsMap,
    };
  }
}
