import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { Todo } from "@modules/todos/infra/typeorm/entities/Todo";

@injectable()
class ListTodoByUserUseCase {

  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository,
  ){}

  async execute(user_id: string): Promise<Todo[]> {

    const todos = this.todosRepository.listTodoByUser(user_id);
    
    return todos;
  }
}

export { ListTodoByUserUseCase }