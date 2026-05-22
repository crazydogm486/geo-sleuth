import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column()
  clue: string;

  @Column()
  category: string;

  @Column()
  difficulty: string;
}
