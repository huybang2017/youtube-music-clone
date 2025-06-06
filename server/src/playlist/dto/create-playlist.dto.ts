import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'user-id-uuid', required: false })
  @IsOptional()
  @IsString()
  user_id?: string;
}
