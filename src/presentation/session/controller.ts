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
            .then((session) => res.json(session))
            .catch(error => this.handleError(error, res))
    }

    getSessionById = (req: Request, res: Response) => {

        const { id } = req.params;

        this.sesionService.getSessionById(id)
            .then((session) => res.json(session))
            .catch(error => this.handleError(error, res))
    }

    getSessionsByMachineId = (req: Request, res: Response) => {

        const { machine } = req.body;

        this.sesionService.getSessionsByMachineId(machine)
            .then((sessions) => res.json(sessions))
            .catch(error => this.handleError(error, res))
    }

    getSessionsByMachineIdAndUserId = (req: Request, res: Response) => {

        const { machine, user } = req.body;

        this.sesionService.getSessionsByMachineIdAndUserId(machine, user)
            .then((sessions) => res.json(sessions))
            .catch(error => this.handleError(error, res))
    }

    getSessionsByUserId = (req: Request, res: Response) => {

        const { user } = req.body;

        this.sesionService.getSessionsByUserId(user.id)
            .then((sessions) => res.json(sessions))
            .catch(error => this.handleError(error, res))
    }










}