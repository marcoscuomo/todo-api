import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTodoByUserUseCase } from './ListTodoByUserUseCase';

class ListTodoByUserController {
  
  async handle(request: Request, response: Response): Promise<Response> {

    const { id: user_id } = request.user;
    const listTodoByUser = container.resolve(ListTodoByUserUseCase);    

    const todos = await listTodoByUser.execute(user_id);

    return response.status(200).json(todos)
  }
}

export { ListTodoByUserController }