import { MaintenanceModel } from "../../data/mongo";
import { CreateMaintenanceDTO, CustomError } from "../../domain";


export class MaintenanceService {

    constructor() { }

    public async createMaintenance(createMaintenanceDto: CreateMaintenanceDTO) {

        try {

            const maintenance = new MaintenanceModel(createMaintenanceDto);

            maintenance.save()

            return {
                maintenance
            };

        }
        catch (error) {

            throw CustomError.internalServer(`${error}`)

        }

    }

    public async getMaintenancesByMachineID(machineID: string) {


    }


}