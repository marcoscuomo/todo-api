import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController';
import { ListTodoController } from '@modules/todos/useCases/listTodo/ListTodoController';
import { Router } from 'express';

const todoRouter = Router();

const listTodoController = new ListTodoController();
const createTodoController = new CreateTodoController();

todoRouter.get('/', listTodoController.handle);
todoRouter.post('/', createTodoController.handle);


export { todoRouter };