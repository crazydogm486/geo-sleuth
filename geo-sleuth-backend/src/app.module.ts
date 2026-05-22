import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CluesModule } from './clues/clues.module';
import { Clue } from './clues/clues.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Clue],
      synchronize: true,
    }),
    CluesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
