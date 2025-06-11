import { Injectable } from '@nestjs/common';
import { Genre, Song } from 'generated/prisma';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma.service';
import { CreateSongDto } from 'src/song/dto/create-song.dto';
import { UpdateSongDto } from 'src/song/dto/update-song.dto';
import { GenreService } from 'src/genre/genre.service';
import { ArtistService } from 'src/artist/artist.service';
import { CreateGenresDto } from 'src/genre/dto/create-genres.dto';
import { AlbumService } from 'src/album/album.service';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { PlaylistService } from 'src/playlist/playlist.service';

@Injectable()
export class SongService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
    private genreService: GenreService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private playlistService: PlaylistService,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    return this.prisma.song.create({
      data: {
        ...createSongDto,
        created_at: new Date(),
      },
    });
  }

  async uploadSongFile(file: Express.Multer.File): Promise<any> {
    const { metadata, audioUrl, thumbnailUrl } =
      await this.cloudinaryService.uploadSongWithMetadata(file);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const genreModel = await this.genreService.predictAudio(file);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const genreNames = genreModel.genre;

    const genres: Genre[] = await this.genreService.createMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      names: genreNames,
    } as CreateGenresDto);

    let artist = await this.artistService.findOneName(
      metadata.artist ?? 'Unknown Artist',
    );
    if (!artist) {
      artist = await this.artistService.create({
        name: metadata.artist ?? 'Unknown Artist',
      });
    }

    const payloadAlbum: CreateAlbumDto = {
      title: metadata.album ?? 'Unknown Album',
      release_date: metadata.year
        ? new Date(metadata.year, 0, 1).toISOString()
        : new Date().toISOString(),
      cover: thumbnailUrl ?? '',
      artist_id: artist.id,
    };

    const albumResult = await this.albumService.create(payloadAlbum);

    const newSong = await this.prisma.song.create({
      data: {
        title: metadata.title ?? 'Unknown Title',
        duration: Math.floor(metadata.duration ?? 0),
        url: audioUrl ?? '',
        cover: thumbnailUrl ?? '',
        created_at: new Date(),
        artist: {
          connect: { id: artist.id },
        },
        songGenres: {
          create: genres.map((genre) => ({
            genre: { connect: { id: genre.id } },
          })),
        },
        albumSongs: {
          create: {
            album: { connect: { id: albumResult.id } },
          },
        },
      },
      include: {
        songGenres: { include: { genre: true } },
        albumSongs: { include: { album: true } },
        artist: true,
      },
    });

    return {
      message: 'File uploaded and song created successfully',
      song: newSong,
    };
  }

  findAll() {
    const songs = this.prisma.song.findMany({
      include: {
        artist: true,
        songGenres: {
          include: {
            genre: true,
          },
        },
        albumSongs: {
          include: {
            album: true,
          },
        },
        playlistSongs: true,
        likes: true,
        histories: true,
        reports: true,
      },
    });

    return songs;
  }

  findOne(id: string) {
    return this.prisma.song.findUnique({
      where: { id },
      include: {
        artist: true,
        songGenres: {
          include: {
            genre: true,
          },
        },
        albumSongs: true,
        playlistSongs: true,
        likes: true,
        histories: true,
        reports: true,
      },
    });
  }

  update(id: string, dto: UpdateSongDto) {
    return this.prisma.song.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.prisma.songGenre.deleteMany({
      where: { song_id: id },
    });

    await this.prisma.song.delete({
      where: { id },
    });

    return { message: 'Song deleted successfully' };
  }
}
