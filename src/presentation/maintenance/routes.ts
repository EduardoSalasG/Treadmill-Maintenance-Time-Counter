import { Router } from "express";
import { MaintenanceService } from "../services";
import { MaintenanceController } from "./controller";

export class MaintenanceRoutes {

    static get routes(): Router {
        const router = Router();

        const machineService = new MaintenanceService();

        const controller = new MaintenanceController(machineService);

        router.post('/', controller.createMaintenance);
        router.get('/:id', controller.getMaintenanceById);
        router.post('/by-machine', controller.getMaintenancesByMachineId);

        return router;
    }
}