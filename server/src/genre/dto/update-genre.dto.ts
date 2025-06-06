import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiPropertyOptional({
    example: 'Rock',
    description: 'Tên thể loại nhạc mới',
  })
  name?: string;
}
