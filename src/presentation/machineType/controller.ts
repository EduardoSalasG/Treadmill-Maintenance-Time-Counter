import { CreateMachineTypeDTO, CustomError } from "../../domain";
import { MachineTypeService } from "../services";
import { Request, Response } from "express";


export class MachineTypeController {

    constructor(
        public readonly machineTypeService: MachineTypeService,
    ) { }

    private handleError = ((error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })

    })

    createMachineType = (req: Request, res: Response) => {
        const [error, createMachineTypeDto] = CreateMachineTypeDTO.create(req.body);
        if (error) return res.status(400).json({ error })



        this.machineTypeService.createMachineType(createMachineTypeDto!)
            .then((machineType) => res.json(machineType))
            .catch(error => this.handleError(error, res))

    }





}