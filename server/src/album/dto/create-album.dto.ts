import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'My First Album',
    description: 'Tên album',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '2025-05-27T00:00:00.000Z',
    description: 'Ngày phát hành (ISO string)',
  })
  @IsDateString()
  release_date: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL ảnh bìa album',
  })
  @IsString()
  cover: string;

  @ApiProperty({
    example: 'f16a2b9d-5c38-4b0d-9b6c-b8fca40e9b92',
    description: 'ID của nghệ sĩ',
  })
  @IsString()
  artist_id: string;
}
