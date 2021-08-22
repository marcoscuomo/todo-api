import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteTodoUseCase } from './DeleteTodoUseCase';

class DeleteTodoController {

  async handle(request: Request, response: Response) {

    const {id: user_id} = request.user;
    const { id } = request.params;
    
    const deleteTodoUseCase = container.resolve(DeleteTodoUseCase);

    await deleteTodoUseCase.execute({ user_id,  id});

    return response.send();
  }
}

export { DeleteTodoController }


