import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';

const usersRouter = Router();

const createUserController = new CreateUserController;
const authenticateUserController = new AuthenticateUserController();

usersRouter.post('/', createUserController.handle);
usersRouter.post('/sessions', authenticateUserController.handle);

export { usersRouter };

