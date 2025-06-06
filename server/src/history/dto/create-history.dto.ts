import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty({ example: 'user-uuid' })
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'song-uuid' })
  @IsString()
  song_id: string;
}
