/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe'
import { verify, sign } from 'jsonwebtoken'

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import auth from '@config/auth'
import { AppError } from '@shared/erros/AppErrors'
import { messages } from '@utils/messages/messages_PT-br'

interface IPayLoad {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayJsProvider')
    private dayProvider: IDateProvider
  ) {}

  async execute (token: string): Promise<string> {
    const {
      secreate_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    const { email, sub } = verify(token, secreate_refresh_token) as IPayLoad

    const user_id = sub
    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError(messages.erros.refreshTokenDoesNotExists)
    }

    await this.userTokensRepository.deleteById(userToken.id)

    const refreshToken = sign({ email }, secreate_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token
    })

    const expiresDate = this.dayProvider.addDays(expires_refresh_token_days)

    await this.userTokensRepository.create({
      expiresDate,
      refreshToken,
      user_id
    })

    return refreshToken
  }
}

export { RefreshTokenUseCase }
