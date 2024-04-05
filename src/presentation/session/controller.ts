import { Request, Response } from "express";
import { CreateSessionDTO, CustomError } from "../../domain";
import { SessionService } from "../services/session.service";

export class SessionController {

    constructor(
        public readonly sesionService: SessionService,
    ) { }

    private handleError = ((error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })

    })

    createSession = (req: Request, res: Response) => {

        const [error, createSessionDto] = CreateSessionDTO.create(req.body)
        if (error) return res.status(500).json({ error })

        this.sesionService.createSession(createSessionDto!)
            .then((maintenance) => res.json(maintenance))
            .catch(error => this.handleError(error, res))
    }

    getSessionsByMachineId = (req: Request, res: Response) => {

        const { machine } = req.body;

        this.sesionService.getSessionsByMachineId(machine)
            .then((maintenance) => res.json(maintenance))
            .catch(error => this.handleError(error, res))
    }

    getSessionId = (req: Request, res: Response) => {

        const { session } = req.body;

        this.sesionService.getSessionById(session)
            .then((maintenance) => res.json(maintenance))
            .catch(error => this.handleError(error, res))
    }









}