import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiPropertyOptional({
    example: 'Nghệ sĩ mới',
    description: 'Tên mới của nghệ sĩ',
  })
  name?: string;

  @ApiPropertyOptional({ example: 'Cập nhật tiểu sử', description: 'Bio mới' })
  bio?: string;

  @ApiPropertyOptional({
    example: 'new-user-id',
    description: 'ID người dùng mới liên kết',
  })
  user_id?: string;
}
