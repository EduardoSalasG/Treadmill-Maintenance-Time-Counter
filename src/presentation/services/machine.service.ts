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
        return "Not implemented"
    }

    public async getMachineById() {
        return "Not implemented"
    }

    // public async updateMachine() {
    //     return "Not implemented"
    // }

    // public async deleteMachine() {
    //     return "Not implemented"
    // }


}