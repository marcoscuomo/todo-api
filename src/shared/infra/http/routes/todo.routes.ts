import { Router } from 'express';

import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController';
import { ListTodoController } from '@modules/todos/useCases/listTodo/ListTodoController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const todoRouter = Router();

const listTodoController = new ListTodoController();
const createTodoController = new CreateTodoController();

todoRouter.get('/', listTodoController.handle);
todoRouter.post('/', ensureAuthenticate, createTodoController.handle);


export { todoRouter };