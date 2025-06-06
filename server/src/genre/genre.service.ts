import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import axios from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'stream';
import { PrismaService } from 'src/prisma.service';
import { CreateGenresDto } from 'src/genre/dto/create-genres.dto';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({
      data: createGenreDto,
    });
  }

  async createMany(createGenresDto: CreateGenresDto) {
    const { names } = createGenresDto;

    const createdGenres = await Promise.all(
      names.map(async (name) => {
        const existingGenre = await this.findOneName(name);
        if (existingGenre) {
          return existingGenre;
        }
        return this.prisma.genre.create({
          data: { name },
        });
      }),
    );

    return createdGenres;
  }

  findAll() {
    return this.prisma.genre.findMany();
  }

  findOne(id: string) {
    return this.prisma.genre.findUnique({
      where: { id },
    });
  }

  findOneName(name: string) {
    return this.prisma.genre.findFirst({
      where: { name },
    });
  }

  update(id: string, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  remove(id: string) {
    return this.prisma.genre.delete({
      where: { id },
    });
  }

  async predictAudio(file: Express.Multer.File): Promise<any> {
    const formData = new FormData();
    const stream = Readable.from(file.buffer);

    formData.append('file', stream, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      'http://localhost:8000/predict/',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Accept: 'application/json',
        },
      },
    );

    return response.data;
  }
}
