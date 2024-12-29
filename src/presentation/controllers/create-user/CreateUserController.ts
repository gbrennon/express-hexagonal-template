import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  CreateUserService,
} from "@application/create-user";
import { CreateUserHttpDTO } from "./dtos/CreateUserHttpDTO";

@Controller("/users")
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() dto: CreateUserHttpDTO) {
    const result = await this.service.execute(dto);

    return { id: result.id };
  }
}
