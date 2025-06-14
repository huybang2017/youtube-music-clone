import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { GenreModule } from 'src/genre/genre.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { PlaylistModule } from 'src/playlist/playlist.module';

@Module({
  imports: [
    CloudinaryModule,
    GenreModule,
    ArtistModule,
    AlbumModule,
    PlaylistModule,
  ],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService],
})
export class SongModule {}
