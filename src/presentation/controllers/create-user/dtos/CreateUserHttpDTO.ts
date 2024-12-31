import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserHttpDTO {
  @IsString()
  @MinLength(3)
   name: string;

   @IsEmail()
   email: string;

   @IsString()
   @MinLength(8)
   password: string;

   constructor(name: string, email: string, password: string) {
     this.name = name;
     this.email = email;
     this.password = password;
   }
}
