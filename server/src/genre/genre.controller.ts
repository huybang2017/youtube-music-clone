import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GenreService } from 'src/genre/genre.service';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả thể loại' })
  findAll() {
    return this.genreService.findAll();
  }
}
