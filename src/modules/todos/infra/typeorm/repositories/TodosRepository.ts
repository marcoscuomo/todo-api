import { getRepository, Repository } from "typeorm";

import { ICreateTodoDTO } from "@modules/todos/dtos/ICreateTodoDTO";
import { ITodosRepository } from "@modules/todos/repositories/ITodosRepository";
import { Todo } from "../entities/Todo";
import { IUpdateTodoDTO } from "@modules/todos/dtos/IUpdateTodoDTO";
import { IDeleteTodoDTO } from "@modules/todos/dtos/IDeleteTodoDTO";

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

  async updateTodo({id, user_id, completed}: IUpdateTodoDTO): Promise<void> {
    
    await this.repository
    .createQueryBuilder()
    .update(Todo)
    .set({
      completed, 
      userUpdate: user_id, 
      updatedAt: new Date()
    })    
    .where("id = :id")
    .setParameters({id})
    .execute();
  }

  async deleteTodo({id, user_id}: IDeleteTodoDTO): Promise<void> {
    
    await this.repository
    .createQueryBuilder()
    .update(Todo)
    .set({
      deleted: true,
      active: false,
      userUpdate: user_id,
      updatedAt: new Date()
    })
    .where("id = :id")
    .setParameters({id})
    .execute();
  }

  async listTodoByUser(user_id: string): Promise<Todo[]> {
    
    const todos = await this.repository.find({
      where: {user_id}
    });

    return todos;
  }

}

export { TodosRepository }