import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { CreateTodoUseCase } from './CreateTodoUseCase';
import { messages} from '@utils/messages/messages_PT-br';
import { AppError } from '@shared/erros/AppErrors';

class CreateTodoController {

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const { title } = request.body;
      const { id: user_id } = request.user;

      const schema = yup.object().shape({      
        title: yup.string()
          .required(messages.validation.campoTitleObrigatorio)
          .min(2, messages.validation.CampoTodoMinimo2Caracteres),
        user_id: yup.string()
          .required(messages.validation.campoUserIdObrigatorio)
      });

      await schema.validate({title, user_id});

      const todoUseCase = container.resolve(CreateTodoUseCase);

      const todo = await todoUseCase.execute({title, user_id});

      return response.status(201).json(todo);
    } catch(err) {

      if(err instanceof yup.ValidationError){
        response.status(401).json({errors: err.errors});
      }

      throw new AppError(err.message);
    }
  }
}

export { CreateTodoController };