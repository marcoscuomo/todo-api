import { Router } from 'express'

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController'

const usersRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

usersRouter.post('/', createUserController.handle)
usersRouter.post('/sessions', authenticateUserController.handle)
usersRouter.post('/refresh-token', refreshTokenController.handle)

export { usersRouter }
