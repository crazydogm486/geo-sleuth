import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CluesService } from './clues.service';
import { CluesController } from './clues.controller';
import { Clue } from './clues.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clue])],
  providers: [CluesService],
  controllers: [CluesController],
})
export class CluesModule {}
