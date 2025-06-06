import { Module } from '@nestjs/common';
import { PlaylistController } from 'src/playlist/playlist.controller';
import { PlaylistService } from 'src/playlist/playlist.service';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
