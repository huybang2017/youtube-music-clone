import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './auth-google.guard';
import { Request, Response } from 'express';
import { GoogleAuthRedirect } from 'src/auth/dto/google-auth-redirect.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileResponse } from 'src/auth/dto/profile-response.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const user = req.user as GoogleAuthRedirect;
    console.log('user', user);

    const result = await this.authService.googleAuthRedirect(user);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 100 * 24 * 60 * 60 * 1000,
    });
    const redirectUrl = new URL('http://localhost:5173');

    return res.redirect(redirectUrl.toString());
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'User profile fetched successfully',
    type: ProfileResponse,
  })
  async getProfile(@Req() req: Request): Promise<ProfileResponse> {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();

    return this.authService.validateUser(token);
  }
}
