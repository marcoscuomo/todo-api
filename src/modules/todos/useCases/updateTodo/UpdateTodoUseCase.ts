import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { AppError } from "@shared/erros/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";
import { IUpdateTodoDTO } from "@modules/todos/dtos/IUpdateTodoDTO";


@injectable()
class UpdateTodoUseCase {

  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ){}
  
  async execute({id, user_id, completed}: IUpdateTodoDTO) {
    
    const todo = await this.todosRepository.findById(id);

    if(!todo){
      throw new AppError(messages.erros.todoNotFound)
    }

    await this.todosRepository.updateTodo({id, user_id, completed});

  }
}

export {UpdateTodoUseCase}