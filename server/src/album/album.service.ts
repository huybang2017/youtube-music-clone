import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    console.log('Creating album with data:', createAlbumDto);
    const existingAlbum = await this.findOneTitle(createAlbumDto.title);

    if (existingAlbum) {
      return existingAlbum;
    }

    const releaseDate = createAlbumDto.release_date
      ? new Date(createAlbumDto.release_date)
      : new Date();

    const newAlbum = await this.prisma.album.create({
      data: {
        ...createAlbumDto,
        release_date: releaseDate,
        created_at: new Date(),
      },
    });

    return newAlbum;
  }

  findAll() {
    return this.prisma.album.findMany({
      include: { artist: true, albumSongs: true },
    });
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
      include: { artist: true, albumSongs: true },
    });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async findByArtist(artistId: string) {
    const albums = await this.prisma.album.findMany({
      where: { artist_id: artistId },
      include: { artist: true, albumSongs: true },
    });
    if (albums.length === 0)
      throw new NotFoundException('No albums found for this artist');
    return albums;
  }

  async findOneTitle(title: string) {
    const album = await this.prisma.album.findFirst({
      where: { title },
      include: { artist: true, albumSongs: true },
    });
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);
    return this.prisma.album.update({
      where: { id },
      data: {
        ...updateAlbumDto,
        ...(updateAlbumDto.release_date && {
          release_date: new Date(updateAlbumDto.release_date),
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.album.delete({
      where: { id },
    });
  }
}
