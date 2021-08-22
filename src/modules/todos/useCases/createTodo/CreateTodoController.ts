import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTodoUseCase } from './CreateTodoUseCase';


class CreateTodoController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { title } = request.body;
    const { id: user_id } = request.user;

    const todoUseCase = container.resolve(CreateTodoUseCase);

    const todo = await todoUseCase.execute({title, user_id});

    return response.status(201).json(todo);
  }
}

export { CreateTodoController };