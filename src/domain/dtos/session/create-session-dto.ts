import { Validators } from "../../../config";

export class CreateSessionDTO {

    private constructor(
        public machine: string, //ID
        public user: string, //ID
        public initDate: Date,
        public duration: number,
        public endDate: Date,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateSessionDTO?] {
        const { machine, user, duration } = object

        if (!machine) return ['Missing machine ID'];
        if (!Validators.isMongoID(machine)) return ['Invalid machine ID']
        if (!user) return ['Missing user ID'];
        if (!Validators.isMongoID(user)) return ['Invalid user ID']
        if (!duration) return ['Missing duration'];
        if (typeof +duration !== 'number') return ['Duration is not a number']

        const endDate: Date = new Date();
        const initDate: Date = new Date(endDate.getTime() - duration * 60000)

        return [undefined, new CreateSessionDTO(machine, user, initDate, duration, endDate)]

    }

}