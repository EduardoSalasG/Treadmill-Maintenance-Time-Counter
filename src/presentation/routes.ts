import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { MachineRoutes } from './machine/routes';
import { MachineTypeRoutes } from './machineType/routes';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        // Definir las rutas
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/machine', MachineRoutes.routes);
        router.use('/api/machine-type', MachineTypeRoutes.routes);


        return router;
    }


}

