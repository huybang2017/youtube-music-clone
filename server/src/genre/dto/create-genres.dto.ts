import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenresDto {
  @ApiProperty({
    example: ['Pop', 'Rock', 'Jazz'],
    description: 'Danh sách tên thể loại nhạc',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  names: string[];
}
