import { Router } from "express";
import { AuthService, MachineService, MaintenanceService } from "../services";
import { MaintenanceController } from "./controller";

export class MaintenanceRoutes {

    static get routes(): Router {
        const router = Router();

        const machineService = new MachineService();
        const authService = new AuthService();

        const maintenanceService = new MaintenanceService(machineService, authService);

        const controller = new MaintenanceController(maintenanceService);

        router.post('/', controller.createMaintenance);
        router.get('/:id', controller.getMaintenanceById);
        router.post('/by-machine', controller.getMaintenancesByMachineId);

        return router;
    }
}