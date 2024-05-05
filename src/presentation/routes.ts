import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { MachineRoutes } from './machine/routes';
import { MachineTypeRoutes } from './machineType/routes';
import { MaintenanceRoutes } from './maintenance/routes';
import { SessionRoutes } from './session/routes';
import { AuthMiddleware } from './middlewares';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        // Definir las rutas
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/machine', [AuthMiddleware.validateJWT], MachineRoutes.routes);
        router.use('/api/machine-type', [AuthMiddleware.validateJWT], MachineTypeRoutes.routes);
        router.use('/api/maintenance', [AuthMiddleware.validateJWT], MaintenanceRoutes.routes);
        router.use('/api/session', [AuthMiddleware.validateJWT], SessionRoutes.routes);


        return router;
    }


}

