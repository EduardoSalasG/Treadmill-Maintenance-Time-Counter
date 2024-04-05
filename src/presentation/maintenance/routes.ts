import { Router } from "express";
import { MaintenanceService } from "../services";
import { MaintenanceController } from "./controller";

export class MaintenanceRoutes {

    static get routes(): Router {
        const router = Router();

        const machineService = new MaintenanceService();

        const controller = new MaintenanceController(machineService);

        router.post('/create', controller.createMaintenance);

        return router;
    }
}