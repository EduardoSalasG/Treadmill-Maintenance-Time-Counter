import { MachineTypeModel } from "../../data/mongo"
import { CreateMachineTypeDTO, CustomError } from "../../domain"



export class MachineTypeService {

    constructor() {

    }

    public async createMachineType(createMachineTypeDto: CreateMachineTypeDTO) {
        const existsMachineType = await MachineTypeModel.findOne({ name: createMachineTypeDto.name });
        if (existsMachineType) throw CustomError.badRequest('Machine type already exists');

        try {

            const machineType = new MachineTypeModel(createMachineTypeDto);

            machineType.save()

            return {
                machineType
            };

        }
        catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async getMachineTypes() {
        return "Not implemented"
    }

    public async getMachineTypeById() {
        return "Not implemented"
    }

    // public async updateMachine() {
    //     return "Not implemented"
    // }

    // public async deleteMachine() {
    //     return "Not implemented"
    // }


}