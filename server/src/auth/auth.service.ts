import { Injectable } from '@nestjs/common';
import { EnumRole } from 'generated/prisma';
import { GoogleAuthRedirect } from './dto/google-auth-redirect.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
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
}
