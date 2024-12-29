import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserHttpDTO {
  @IsNotEmpty()
  @IsString()
   name!: string;

   @IsNotEmpty()
   @IsEmail()
   email!: string;

   @IsNotEmpty()
   @MinLength(8)
   password!: string;
}
