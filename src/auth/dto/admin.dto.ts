import { IsString, Length } from 'class-validator';

export class CreateAdminDTO {
  @IsString()
  email: string;
}
