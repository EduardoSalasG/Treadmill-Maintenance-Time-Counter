import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { MachineRoutes } from './machine/routes';
import { MachineTypeRoutes } from './machineType/routes';
import { MaintenanceRoutes } from './maintenance/routes';
import { SessionRoutes } from './session/routes';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        // Definir las rutas
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/machine', MachineRoutes.routes);
        router.use('/api/machine-type', MachineTypeRoutes.routes);
        router.use('/api/maintenance', MaintenanceRoutes.routes);
        router.use('/api/session', SessionRoutes.routes);


        return router;
    }


}

