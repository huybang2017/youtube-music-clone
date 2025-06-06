import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { GoogleAuthGuard } from 'src/auth/auth-google.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
