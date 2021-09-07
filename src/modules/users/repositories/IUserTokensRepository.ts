import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

interface IUserTokensRepository {
  // eslint-disable-next-line camelcase
  create({ expiresDate, refreshToken, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
  // eslint-disable-next-line camelcase
  findByUserIdAndRefreshToken(user_id: string, refreshToken: string): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refreshToken: string): Promise<UserTokens>
}

export { IUserTokensRepository }
