import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/erros/AppErrors";
import { messages } from "../../../../utils/messages/messages_PT-br";

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
}


@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository,
  ){}

  async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findByEmail(email);

    if(!user){
      throw new AppError(messages.erros.emailOrPasswordIncorrect, 401);
    }

    const passwordMach = await compare(password, user.password);

    if(!passwordMach){
      throw new AppError(messages.erros.emailOrPasswordIncorrect, 401);
    }

    const token = sign({}, 'todoCreateToken', {
      subject: user.id,
      expiresIn: '1d'
    });

    const returnToken: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    };

    return returnToken;
  }
}

export { AuthenticateUserUseCase };