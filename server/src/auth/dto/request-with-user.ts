import { Request } from 'express';
import { GoogleAuthRedirect } from 'src/auth/dto/google-auth-redirect.dto';

export interface RequestWithUser extends Request {
  user: GoogleAuthRedirect;
}
