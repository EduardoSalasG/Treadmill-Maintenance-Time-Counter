import { Router } from "express";
import { MachineTypeService } from "../services";
import { MachineTypeController } from "./controller";



export class MachineTypeRoutes {

    static get routes(): Router {

        const router = Router();

        const machineTypeService = new MachineTypeService();

        const controller = new MachineTypeController(machineTypeService);

        router.post('/create', controller.createMachineType);

        return router;
    }

}