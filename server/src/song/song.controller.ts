import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { SongService } from './song.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Song')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả bài hát' })
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy bài hát theo ID' })
  findOne(@Param('id') id: string) {
    return this.songService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bài hát theo ID' })
  remove(@Param('id') id: string) {
    return this.songService.remove(id);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload file bài hát lên Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chọn file nhạc để upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.songService.uploadSongFile(file);
  }
}
