import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() dto: CreateHistoryDto) {
    return this.historyService.create(dto);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get('user/:user_id')
  findByUser(@Param('user_id') userId: string) {
    return this.historyService.findByUser(userId);
  }
}
