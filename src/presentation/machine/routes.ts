import { Router } from "express";
import { MachineService } from "../services";
import { MachineController } from "./controller";



export class MachineRoutes {

    static get routes(): Router {

        const router = Router();

        const machineService = new MachineService();

        const controller = new MachineController(machineService);

        router.post('/create', controller.createMachine);

        return router;
    }

}