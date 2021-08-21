import { Router } from 'express';

import { todoRouter } from './todo.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/todos', todoRouter);
router.use('/users', usersRouter);

export { router };