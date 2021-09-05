import { container } from 'tsyringe'

import { ITodosRepository } from '@modules/todos/repositories/ITodosRepository'
import { TodosRepository } from '@modules/todos/infra/typeorm/repositories/TodosRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

container.registerSingleton<ITodosRepository>(
  'TodosRepository',
  TodosRepository
)

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
)
