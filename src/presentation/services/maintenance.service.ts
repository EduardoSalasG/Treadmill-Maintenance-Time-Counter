import { AuthService, MachineService } from ".";
import { Validators } from "../../config";
import { MachineModel, MaintenanceModel } from "../../data/mongo";
import { CreateMaintenanceDTO, CustomError } from "../../domain";


export class MaintenanceService {

    constructor(
        private machineService: MachineService,
        private authService: AuthService,
    ) { }


    public async createMaintenance(createMaintenanceDto: CreateMaintenanceDTO) {

        await this.authService.userExists(createMaintenanceDto.user)

        let status = await this.machineService.checkStatus(createMaintenanceDto.machine)
        if (status) throw CustomError.badRequest(`Cannot create new maintenance because machine with id ${createMaintenanceDto.machine} doesn't need maintenance`)

        try {

            const maintenance = new MaintenanceModel(createMaintenanceDto);

            await maintenance.save()
            let status = await this.machineService.updateStatus(createMaintenanceDto.machine);

            return {
                maintenance,
                status
            };

        }
        catch (error) {

            throw CustomError.internalServer(`${error}`)

        }

    }

    public async getMaintenanceById(maintenanceId: string) {
        if (!Validators.isMongoID(maintenanceId)) throw CustomError.badRequest('Invalid maintenance ID');

        try {
            const maintenance = await MaintenanceModel.findById(maintenanceId)
            if (!maintenance) throw CustomError.badRequest(`Maintenance with id ${maintenanceId} doesn't exists`)

            return { maintenance }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }
    }

    public async getMaintenancesByMachineId(machineId: string) {
        machineId = machineId.toString();
        if (!machineId) throw CustomError.badRequest('Missing machine ID');
        if (!Validators.isMongoID(machineId)) throw CustomError.badRequest('Invalid machine ID');

        const machineExists = await MachineModel.findById(machineId)
        if (!machineExists) throw CustomError.badRequest(`Machine with id ${machineId} doesn't exists`)

        try {
            const maintenances = await MaintenanceModel.find({ machine: machineId })
            if (!maintenances) throw CustomError.badRequest(`Machine with id ${machineId} hasn't any maintenances yet`)

            return { maintenances }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)

        }


    }


}