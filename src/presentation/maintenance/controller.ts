import { Request, Response } from "express";
import { MaintenanceService } from "../services";
import { CreateMaintenanceDTO, CustomError } from "../../domain";


export class MaintenanceController {

    constructor(
        public readonly maintenanceService: MaintenanceService,
    ) { }

    private handleError = ((error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })

    })

    createMaintenance = (req: Request, res: Response) => {

        const [error, createMaintenanceDto] = CreateMaintenanceDTO.create(req.body);
        if (error) return res.status(400).json({ error })

        this.maintenanceService.createMaintenance(createMaintenanceDto!)
            .then((maintenance) => res.json(maintenance))
            .catch(error => this.handleError(error, res))

    }

}