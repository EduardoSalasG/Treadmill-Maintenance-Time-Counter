import { Validators } from "../../../config";

export class CreateMaintenanceDTO {

    private constructor(
        public description: string,
        public machine: string, //ID
        public user: string, //ID
        public date: Date = new Date()
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateMaintenanceDTO?] {
        const { description, machine, user } = object

        if (!description) return ['Missing description'];
        if (!machine) return ['Missing machine id'];
        if (!Validators.isMongoID(machine)) return ['Invalid machine ID']
        if (!user) return ['Missing user id'];
        if (!Validators.isMongoID(user)) return ['Invalid user ID']

        return [undefined, new CreateMaintenanceDTO(description, machine, user)]
    }

}