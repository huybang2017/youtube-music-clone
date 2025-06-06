import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlaylistDto) {
    const playlist = await this.prisma.playlist.create({
      data: {
        ...dto,
        created_at: new Date(),
      },
    });

    return playlist;
  }

  async findAll() {
    return this.prisma.playlist.findMany({
      include: {
        user: true,
        playlistSongs: {
          include: {
            song: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        user: true,
        playlistSongs: {
          include: {
            song: true,
          },
        },
      },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.playlist.delete({ where: { id } });
  }
}
