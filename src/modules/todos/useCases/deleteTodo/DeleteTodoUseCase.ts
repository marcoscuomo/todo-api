import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { IDeleteTodoDTO } from "@modules/todos/dtos/IDeleteTodoDTO";
import { AppError } from "@shared/erros/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";

@injectable()
class DeleteTodoUseCase {
  
  constructor(
    @inject("TodosRepository")  
    private todosRepository: ITodosRepository,
  ){}
  
  async execute({id, user_id}: IDeleteTodoDTO): Promise<void> {

    const todo = await this.todosRepository.findById(id);

    if(!todo) {
      throw new AppError(messages.erros.todoNotFound, 404);
    }

    await this.todosRepository.deleteTodo({ id, user_id });

  }
}

export { DeleteTodoUseCase }