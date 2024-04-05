import { SessionModel } from "../../data/mongo";
import { CreateSessionDTO, CustomError } from "../../domain";


export class SessionService {

    constructor() { }

    public async createSession(createSessionDto: CreateSessionDTO) {
        try {
            const session = new SessionModel(createSessionDto);

            session.save()

            return {
                session
            }
        }
        catch (error) {

            throw CustomError.internalServer(`${error}`)

        }
    }

    //TODO: Hacer
    public async getSessionsByMachineId(machineId: string) {
        return 'Not implemented'
    }

    //TODO: Hacer
    public async getSessionById(sessionId: string) {
        return 'Not implemented'
    }


}