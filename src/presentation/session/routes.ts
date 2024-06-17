import { Router } from "express";
import { SessionService } from "../services/session.service";
import { SessionController } from "./controller";


export class SessionRoutes {

    static get routes(): Router {

        const router = Router();

        const sessionService = new SessionService();

        const controller = new SessionController(sessionService);

        router.post('/', controller.createSession);
        router.get('/:id', controller.getSessionById);
        router.post('/by-machine', controller.getSessionsByMachineId);
        router.post('/by-machine-and-user', controller.getSessionsByMachineIdAndUserId);
        router.post('/by-user', controller.getSessionsByUserId);

        return router;

    }

}