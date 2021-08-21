import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/erros/AppErrors";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ){}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    
    const alreadyUser = await this.userRepository.findByEmail(email);

    if(alreadyUser){
      throw new AppError('User Already exists', 401);
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash
    });
  }
}

export { CreateUserUseCase };