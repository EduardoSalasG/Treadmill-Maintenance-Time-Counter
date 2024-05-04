import { Validators } from "../../config";
import { MachineModel } from "../../data/mongo"
import { CreateMachineDTO, CustomError } from "../../domain"



export class MachineService {

    constructor() {

    }

    public async createMachine(createMachineDto: CreateMachineDTO) {
        const existsMachine = await MachineModel.findOne({ name: createMachineDto.name });
        if (existsMachine) throw CustomError.badRequest('Machine already exists');

        try {

            const machine = new MachineModel(createMachineDto);

            machine.save()

            return {
                machine
            };

        }
        catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async getMachines() {

        try {
            const machines = await MachineModel.find();

            if (!machines) throw CustomError.badRequest('There are not machines created')
            return { machines }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async getMachineById(machineId: string) {

        if (!Validators.isMongoID(machineId)) throw CustomError.badRequest('Invalid machine type ID');

        try {
            const machine = await MachineModel.findById(machineId)
            if (!machine) throw CustomError.badRequest(`Machine with id ${machineId} doesn't exists`)

            return machine

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async updateMachineTimes(machineId: string, duration: number) {
        console.log({ machineId, duration })

        const machine = await MachineModel.findById(machineId)
        if (!machine) throw CustomError.badRequest(`Machine with id ${machineId} doesn't exists`)
        console.log(machine)

        try {

            let checkCurrentUsedTime = this.checkCurrentUsedTime(duration, machine.currentUsedTime, machine.limitTime)
            if (checkCurrentUsedTime.exceeds) {
                machine.currentUsedTime = checkCurrentUsedTime.newCurrentUsedTime - machine.limitTime;
                machine.status = 'NEEDS MAINTENANCE';
            } else {
                machine.currentUsedTime += duration;
            }

            machine.accumulatedUsedTime += duration;

            return await machine.save();

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    private checkCurrentUsedTime(duration: number, currentUsedTime: number, limitTime: number) {
        let newCurrentUsedTime = duration + currentUsedTime
        return { exceeds: newCurrentUsedTime >= limitTime, newCurrentUsedTime }
    }

    public async checkStatus(machineID: string) {

        const machine = await MachineModel.findById(machineID)
        if (!machine) throw CustomError.badRequest(`Machine with id ${machine} doesn't exists`)

        try {
            return machine.status == 'OPERATIVE'

        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }

    }

    public async updateStatus(machineID: string) {

        const machine = await MachineModel.findById(machineID)
        if (!machine) throw CustomError.badRequest(`Machine with id ${machine} doesn't exists`)

        try {
            machine.status == 'OPERATIVE' ? machine.status = 'NEEDS MAINTENANCE' : machine.status = 'OPERATIVE';
            machine.save();
            return machine.status;

        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }

    }



    // public async deleteMachine() {
    //     return "Not implemented"
    // }


}