import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class NoteModel extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  date: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.TEXT)
  content: string;

  @Column(DataType.ARRAY(DataType.STRING))
  datementions: string[];
}
