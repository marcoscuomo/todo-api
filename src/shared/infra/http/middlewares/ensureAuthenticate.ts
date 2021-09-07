/* eslint-disable camelcase */
import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { AppError } from '@shared/erros/AppErrors'
import auth from '@config/auth'
import { messages } from '../../../../utils/messages/messages_PT-br'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

interface IPayLoad {
  sub: string;
}

async function ensureAuthenticate (request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  const userTokensRepository = new UserTokensRepository()

  if (!authHeader) {
    throw new AppError(messages.erros.tokenIsMissing, 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, auth.secreate_refresh_token) as IPayLoad

    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!user) {
      throw new AppError(messages.erros.userDoesNotExists, 401)
    }

    request.user = { id: user_id }

    next()
  } catch {
    throw new AppError(messages.erros.invalidToken, 401)
  }
}

export { ensureAuthenticate }
