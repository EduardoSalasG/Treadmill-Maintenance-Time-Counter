import { Validators } from "../../../config";


export class CreateMachineDTO {

    private constructor(
        public name: string,
        public limitTime: Number,
        public machineType: string,
        public currentUsedTime: Number = 0,
        public accumulatedUsedTime: Number = 0,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateMachineDTO?] {
        const { name, limitTime, machineType } = object;

        if (!name) return ['Missing name'];
        if (!limitTime) return ['Missing limit time'];
        if (!machineType) return ['Missing machine type'];
        if (!Validators.isMongoID(machineType)) return ['Invalid machine type ID'];


        return [undefined, new CreateMachineDTO(name, limitTime, machineType)]
    }


}