/* eslint-disable camelcase */
import { Repository, getRepository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { UserTokens } from '../entities/UserTokens'

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor () {
    this.repository = getRepository(UserTokens)
  }

  async create ({ expiresDate, refreshToken, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiresDate, refreshToken, user_id
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken (user_id: string, refreshToken: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      user_id, refreshToken
    })

    return userToken
  }

  async deleteById (id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken (refreshToken: string): Promise<UserTokens> {
    return await this.repository.findOne({ refreshToken })
  }
}

export { UserTokensRepository }
