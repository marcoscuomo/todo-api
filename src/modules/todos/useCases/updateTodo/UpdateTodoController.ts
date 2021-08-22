import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateTodoUseCase } from './UpdateTodoUseCase';

class UpdateTodoController {

  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const { id } = request.params;
    const { completed } = request.body;

    const updateTodoUseCase = container.resolve(UpdateTodoUseCase);

    await updateTodoUseCase.execute({ user_id, id, completed });

    return response.send();
  }
}

export {UpdateTodoController}