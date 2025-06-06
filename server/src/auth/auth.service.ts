import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnumRole } from 'generated/prisma';
import { GoogleAuthRedirect } from './dto/google-auth-redirect.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileResponse } from 'src/auth/dto/profile-response.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async googleAuthRedirect(user: GoogleAuthRedirect) {
    let existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          provider: user.provider,
          providerId: user.providerId,
          role: EnumRole.USER,
        },
      });
    }

    return {
      user: existingUser,
      accessToken: this.jwtService.sign({
        sub: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      }),
      message: 'Đăng nhập thành công',
    };
  }

  async validateUser(token: string): Promise<ProfileResponse> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return plainToClass(ProfileResponse, user);
    } catch (error) {
      throw new UnauthorizedException(error || 'Invalid token');
    }
  }
}
