/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/erros/AppErrors'
import { messages } from '../../../../utils/messages/messages_PT-br'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject('UserRepository')
    private userRepository: UserRepository,

    @inject('DayJsProvider')
    private dayProvider: IDateProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError(messages.erros.emailOrPasswordIncorrect, 401)
    }

    const passwordMach = await compare(password, user.password)

    if (!passwordMach) {
      throw new AppError(messages.erros.emailOrPasswordIncorrect, 401)
    }

    const token = sign({}, auth.secreat_token, {
      subject: user.id,
      expiresIn: auth.expires_refresh_token_days
    })

    const refreshToken = sign({ email }, auth.secreate_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    })

    const refreshTokenExpiresDate = this.dayProvider.addDays(auth.expires_refresh_token_days)

    await this.userTokensRepository.create({
      user_id: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate
    })

    const returnToken: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refreshToken
    }

    return returnToken
  }
}

export { AuthenticateUserUseCase }
