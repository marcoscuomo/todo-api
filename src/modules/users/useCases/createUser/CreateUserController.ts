import { Request, Response} from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { CreateUserUseCase } from './CreateUserUseCase';
import { messages } from '../../../../utils/messages/messages_PT-br';
import { AppError } from '@shared/erros/AppErrors';


class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        try {
            const schema = yup.object().shape({
                name: yup.string().required(messages.validation.CampoNomeObrigatorio),
                email: yup.string().email(messages.validation.CampoEmailNaoValido).required(messages.validation.CampoEmailObrigatorio),
                password: yup.string().required().min(6, messages.validation.CampoSenhaMinimo6Digitos)
            });
    
            await schema.validate(request.body, {
                abortEarly: false
            });            
            
            const { name, email, password } = request.body;
    
            const createUserUseCase = container.resolve(CreateUserUseCase);
    
            await createUserUseCase.execute({ name, email, password});
    
            return response.status(201).send();
        } catch(err) {
            
            if(err instanceof yup.ValidationError){
                response.status(401).json({ errors: err.errors });
            }

            throw new AppError(err.message);
        }
    }
}

export { CreateUserController };