import { Router } from "express";
import { SessionService } from "../services/session.service";
import { SessionController } from "./controller";


export class SessionRoutes {

    static get routes(): Router {

        const router = Router();

        const sessionService = new SessionService();

        const controller = new SessionController(sessionService);

        router.post('/create', controller.createSession);

        return router;

    }

}