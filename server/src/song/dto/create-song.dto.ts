import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty({
    example: 'Lạc Trôi',
    description: 'Tiêu đề bài hát',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://res.cloudinary.com/.../lac-troi.mp3',
    description: 'Đường dẫn URL đến file nhạc',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: 'https://res.cloudinary.com/.../lac-troi.jpg',
    description: 'Đường dẫn URL đến ảnh bìa bài hát',
  })
  @IsString()
  @IsNotEmpty()
  cover: string;

  @ApiProperty({
    example: 215,
    description: 'Thời lượng bài hát tính bằng giây',
  })
  @IsInt()
  duration: number;

  @ApiProperty({
    example: 'artist-id-123',
    description: 'ID của nghệ sĩ',
  })
  @IsString()
  artist_id: string;
}
