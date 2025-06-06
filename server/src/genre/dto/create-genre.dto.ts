import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Pop', description: 'Tên thể loại nhạc' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
