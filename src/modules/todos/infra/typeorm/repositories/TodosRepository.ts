import { getRepository, Repository } from "typeorm";

import { ICreateTodoDTO } from "@modules/todos/dtos/ICreateTodoDTO";
import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { Todo } from "../entities/Todo";

class TodosRepository implements ITodosRepository {
  
  private repository: Repository<Todo>;

  constructor(){
    this.repository = getRepository(Todo);
  }  
  
  async create({ title, user_id }: ICreateTodoDTO): Promise<Todo> {
    const todo = this.repository.create({
      title, user_id
    });

    this.repository.save(todo);

    return todo;
  }
  
  async findById(id: string): Promise<Todo> {
    
    return await this.repository.findOne({id});
  }
  
  async listTodos(): Promise<Todo[]> {
    
    return await this.repository.find();
  }

  async findByTitle(title: string): Promise<Todo> {
    
    const todo = await this.repository.findOne({title});

    return todo;
  }

}

export { TodosRepository }