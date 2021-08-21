import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";

interface ITodosRepository {
  create(data: ICreateTodoDTO): Promise<Todo>;
  findById(id: string): Promise<Todo>;
  listTodos(): Promise<Todo[]>;
  findByTitle(title: string): Promise<Todo>;
}

export { ITodosRepository };