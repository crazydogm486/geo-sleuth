import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CluesService } from './clues.service';

@ApiTags('clues')
@Controller('clues')
export class CluesController {
  constructor(private readonly cluesService: CluesService) {}

  @Get('random')
  @ApiOperation({ summary: 'Fetch a random geography clue' })
  @ApiResponse({
    status: 200,
    description: 'Successfully returns a random clue object.',
  })
  async getRandomClue() {
    return this.cluesService.getRandomClue();
  }
}
