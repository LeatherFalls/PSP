import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number',
  })
  password?: string | null;
}
