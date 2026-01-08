import { IsString, Length } from 'class-validator';

export class SignUpDTO {
  @IsString()
  email: string;
  @IsString()
  @Length(5, 12)
  password: string;
}
