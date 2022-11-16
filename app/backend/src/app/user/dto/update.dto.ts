import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  password?: string | null;
}
