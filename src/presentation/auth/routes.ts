import { Router } from 'express';
import { AuthController } from './controller';
// import { AuthService, EmailService } from '../services';
import { envs } from '../../config/envs';




export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        // const emailService = new EmailService(
        //     envs.MAILER_SERVICE,
        //     envs.MAILER_EMAIL,
        //     envs.MAILER_SECRET_KEY,
        //     envs.SEND_EMAIL
        // );

        // const authService = new AuthService(emailService);

        const controller = new AuthController();

        // Definir las rutas
        // router.use('/api/todos', /*TodoRoutes.routes */ );
        // router.post('/login', controller.loginUser);
        // router.post('/register', controller.registerUser);

        // router.get('/validate-email/:token', controller.validateEmail);
        router.get('/test', controller.test);

        return router;
    }


}

