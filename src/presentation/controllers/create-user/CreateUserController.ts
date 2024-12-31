import { Request, Response } from "express";
import {
  CreateUserService,
} from "@application/create-user";
import { CreateUserHttpDTO } from "./dtos/CreateUserHttpDTO";
import { validate } from "class-validator";

export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dto = new CreateUserHttpDTO(
      req.body.name,
      req.body.email,
      req.body.password
    );
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors
      });
    }

    try {
      const result = await this.service.execute(dto);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
