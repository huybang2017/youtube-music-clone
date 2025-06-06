import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'src/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SongModule } from './song/song.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { GenreModule } from './genre/genre.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { PlaylistModule } from './playlist/playlist.module';
import { HistoryModule } from './history/history.module';
import { LoggerMiddleware } from 'src/utils/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    SongModule,
    CloudinaryModule,
    GenreModule,
    ArtistModule,
    AlbumModule,
    PlaylistModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
