import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/erros/AppErrors";
import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

import { messages } from '../../../../utils/messages/messages_PT-br';

interface IPayLoad {
  sub: string;
}

function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError(messages.erros.tokenIsMissing, 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id} = verify(token, 'todoCreateToken') as IPayLoad;

    const userRepository = new UserRepository();
    const user = userRepository.findById(user_id);

    if(!user) {
      throw new AppError(messages.erros.userDoesNotExists, 401);
    }

    request.user = { id: user_id };

    next();

  } catch {
    throw new AppError(messages.erros.invalidToken, 401);
  }
}

export { ensureAuthenticate }