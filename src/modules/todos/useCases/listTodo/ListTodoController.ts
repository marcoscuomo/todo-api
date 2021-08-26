import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTodoUseCase } from './ListTodoUseCase';

class ListTodoController {
  
  async handle(request: Request, response: Response): Promise<Response> {
    
    const listTodos = container.resolve(ListTodoUseCase);

    const todos = await listTodos.execute();    

    return response.status(200).json(todos);
  }
}

export { ListTodoController };