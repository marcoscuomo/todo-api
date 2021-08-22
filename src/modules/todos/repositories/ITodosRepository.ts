import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { IDeleteTodoDTO } from "../dtos/IDeleteTodoDTO";
import { IUpdateTodoDTO } from "../dtos/IUpdateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";

interface ITodosRepository {
  create(data: ICreateTodoDTO): Promise<Todo>;
  findById(id: string): Promise<Todo>;
  listTodos(): Promise<Todo[]>;
  findByTitle(title: string): Promise<Todo>;
  updateTodo(data: IUpdateTodoDTO): Promise<void>;
  deleteTodo(data: IDeleteTodoDTO): Promise<void>;
}

export { ITodosRepository };