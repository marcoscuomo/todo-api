import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController';
import { ListTodoController } from '@modules/todos/useCases/listTodo/ListTodoController';
import { UpdateTodoController } from '@modules/todos/useCases/updateTodo/UpdateTodoController';
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController';
import { ListTodoByUserController } from '@modules/todos/useCases/listTodoByUser/ListTodoByUserController';

const todoRouter = Router();

const listTodoController = new ListTodoController();
const createTodoController = new CreateTodoController();
const updateTodoController = new UpdateTodoController();
const deleteTodoController = new DeleteTodoController();
const listTodoByUserController = new ListTodoByUserController();

todoRouter.get('/', listTodoController.handle);
todoRouter.post('/', ensureAuthenticate, createTodoController.handle);
todoRouter.put('/update/:id', ensureAuthenticate, updateTodoController.handle);
todoRouter.post('/delete/:id', ensureAuthenticate, deleteTodoController.handle);
todoRouter.get('/list', ensureAuthenticate, listTodoByUserController.handle);


export { todoRouter };