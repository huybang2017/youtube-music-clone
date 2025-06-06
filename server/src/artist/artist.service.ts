import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const existingArtist = await this.findOneName(createArtistDto.name);
    if (existingArtist) {
      throw new Error(
        `Artist with name ${createArtistDto.name} already exists.`,
      );
    }

    return this.prisma.artist.create({
      data: {
        ...createArtistDto,
        created_at: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  findOne(id: string) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  findOneName(name: string) {
    return this.prisma.artist.findFirst({
      where: { name },
    });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  remove(id: string) {
    return this.prisma.artist.delete({ where: { id } });
  }
}
