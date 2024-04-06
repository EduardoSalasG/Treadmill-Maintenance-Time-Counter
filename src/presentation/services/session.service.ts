import { Validators } from "../../config";
import { MachineModel, SessionModel, UserModel } from "../../data/mongo";
import { CreateSessionDTO, CustomError } from "../../domain";
import { MachineService } from "./machine.service";


export class SessionService {

    constructor(
        public machineService: MachineService = new MachineService(),
    ) { }

    public async createSession(createSessionDto: CreateSessionDTO) {
        if (!createSessionDto.machine) throw CustomError.badRequest('Missing machine ID');
        if (!Validators.isMongoID(createSessionDto.machine)) throw CustomError.badRequest('Invalid machine ID');

        let status = await this.checkStatus(createSessionDto.machine)

        if (!status) throw CustomError.badRequest(`Cannot create new session because machine with id ${createSessionDto.machine} needs maintenance`)

        try {
            const session = new SessionModel(createSessionDto);

            await session.save();

            await this.machineService.updateMachineTimes(session.machine.toString(), session.duration);

            return { session }

        }
        catch (error) {

            throw CustomError.internalServer(`${error}`)

        }
    }

    private async checkStatus(machineID: string) {

        const machine = await MachineModel.findById(machineID)
        if (!machine) throw CustomError.badRequest(`Machine with id ${machine} doesn't exists`)

        try {
            return machine.status == 'OPERATIVE'

        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }

    }

    public async getSessionsByMachineId(machineId: string) {
        if (!machineId) throw CustomError.badRequest('Missing machine ID');
        if (!Validators.isMongoID(machineId)) throw CustomError.badRequest('Invalid machine ID');

        const machineExists = await MachineModel.findById(machineId)
        if (!machineExists) throw CustomError.badRequest(`Machine with id ${machineId} doesn't exists`)

        try {
            const sessions = await SessionModel.find({ machine: machineId })
                .populate('user', 'name')
            if (!sessions) throw CustomError.badRequest(`Machine with id ${machineId} hasn't any session yet`)

            return { sessions }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }
    }

    public async getSessionById(sessionId: string) {
        if (!Validators.isMongoID(sessionId)) throw CustomError.badRequest('Invalid session ID');

        try {
            const session = await SessionModel.findById(sessionId)
                .populate('user', 'name')
            if (!session) throw CustomError.badRequest(`Session with id ${sessionId} doesn't exists`)

            return { session }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }
    }

    public async getSessionsByMachineIdAndUserId(machineId: string, userId: string) {

        if (!machineId) throw CustomError.badRequest('Missing machine ID');
        if (!Validators.isMongoID(machineId)) throw CustomError.badRequest('Invalid machine ID');

        if (!userId) throw CustomError.badRequest('Missing user ID');
        if (!Validators.isMongoID(userId)) throw CustomError.badRequest('Invalid user ID');

        const machineExists = await MachineModel.findById(machineId)
        if (!machineExists) throw CustomError.badRequest(`Machine with id ${machineId} doesn't exists`)

        const userExists = await UserModel.findById(userId)
        if (!userExists) throw CustomError.badRequest(`User with id ${userId} doesn't exists`)

        try {
            const sessions = await SessionModel.find({ machine: machineId, user: userId })
            if (!sessions) throw CustomError.badRequest(`User with id ${userId} hasn't any session in Machine with id ${machineId} yet`)

            return { sessions }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }
    }


}