import { IsString, Length } from 'class-validator';

export class SignInDTO {
  @IsString()
  email: string;
  @IsString()
  @Length(5, 12)
  password: string;
}
