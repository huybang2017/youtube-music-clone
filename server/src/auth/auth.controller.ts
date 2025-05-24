import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './auth-google.guard';
import { Request, Response } from 'express';
import { GoogleAuthRedirect } from 'src/auth/dto/google-auth-redirect.dto';
import { AuthService } from 'src/auth/auth.service';

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

    const redirectUrl = new URL('http://localhost:5173/google-callback');

    redirectUrl.searchParams.set('accessToken', result.accessToken ?? '');
    redirectUrl.searchParams.set('name', result.user?.name ?? '');
    redirectUrl.searchParams.set('email', result.user?.email ?? '');
    redirectUrl.searchParams.set('avatar', result.user?.avatar ?? '');
    redirectUrl.searchParams.set('provider', result.user?.provider ?? '');
    redirectUrl.searchParams.set('providerId', result.user?.providerId ?? '');
    redirectUrl.searchParams.set('role', result.user?.role ?? '');

    return res.redirect(redirectUrl.toString());
  }
}
