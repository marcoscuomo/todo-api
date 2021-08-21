import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { AppError } from "@shared/erros/AppErrors";
import { Todo } from "@modules/todos/infra/typeorm/entities/Todo";

interface IRequest {
  title: string;
  user_id: string;
}

@injectable()
class CreateTodoUseCase {

  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ){}

  async execute({title, user_id}: IRequest): Promise<Todo> {
    
    const todoExistis = await this.todosRepository.findByTitle(title);

    if(todoExistis){
      throw new AppError('Todo already exists', 401);
    }
    
    const todo = this.todosRepository.create({title, user_id});

    return todo;
  }
}

export { CreateTodoUseCase };