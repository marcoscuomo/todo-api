import 'reflect-metadata';
import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { Todo } from "@modules/todos/infra/typeorm/entities/Todo";

@injectable()
class ListTodoUseCase {

	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	){}

	async execute(): Promise<Todo[]> {
		return await this.todosRepository.listTodos();
	}
}

export { ListTodoUseCase };