

export class CreateMachineTypeDTO {

    private constructor(
        public name: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateMachineTypeDTO?] {
        const { name } = object;

        if (!name) return ['Missing name'];

        return [undefined, new CreateMachineTypeDTO(name)]
    }


}