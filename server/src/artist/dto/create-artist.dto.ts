import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ example: 'Sơn Tùng M-TP', description: 'Tên nghệ sĩ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user-uuid-1234',
    description: 'ID người dùng liên kết với nghệ sĩ',
  })
  @IsString()
  @IsOptional()
  user_id?: string;
}
