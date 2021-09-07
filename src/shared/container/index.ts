import { container } from 'tsyringe'

import '@shared/container/providers'

import { ITodosRepository } from '@modules/todos/repositories/ITodosRepository'
import { TodosRepository } from '@modules/todos/infra/typeorm/repositories/TodosRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

container.registerSingleton<ITodosRepository>(
  'TodosRepository',
  TodosRepository
)

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
