import { CreateMachineDTO, CustomError } from "../../domain";
import { MachineService } from "../services";
import { Request, Response } from "express";


export class MachineController {

    constructor(
        public readonly machineService: MachineService,
    ) { }

    private handleError = ((error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })

    })

    createMachine = (req: Request, res: Response) => {
        const [error, createMachineDto] = CreateMachineDTO.create(req.body);
        if (error) return res.status(400).json({ error })



        this.machineService.createMachine(createMachineDto!)
            .then((machine) => res.json(machine))
            .catch(error => this.handleError(error, res))

    }





}