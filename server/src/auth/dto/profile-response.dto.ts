import { Expose } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsUrl,
  IsEnum,
  IsUUID,
  IsDate,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class ProfileResponse {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsUrl()
  avatar: string;

  @Expose()
  @IsString()
  provider: string;

  @Expose()
  @IsString()
  providerId: string;

  @Expose()
  @IsEnum(UserRole)
  role: UserRole;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;
}
