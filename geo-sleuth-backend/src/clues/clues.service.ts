import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clue } from './clues.entity';
import cluesMock from './clues.mock.json';

@Injectable()
export class CluesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Clue)
    private cluesRepository: Repository<Clue>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.cluesRepository.count();
    if (count === 0) {
      console.log('Database empty! Seeding initial data...');
      await this.cluesRepository.save(cluesMock);
      console.log('Seeding complete!');
    }
  }

  async getRandomClue(): Promise<Clue> {
    const clue = await this.cluesRepository
      .createQueryBuilder('clue')
      .orderBy('RANDOM()')
      .getOne();
    if (!clue) {
      throw new Error('No clue found');
    }
    return clue;
  }
}
