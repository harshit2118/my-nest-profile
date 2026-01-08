import { IsString, Length } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @Length(3, 12)
  name: string;
  @IsString()
  @Length(10, 50)
  description: string;
}
