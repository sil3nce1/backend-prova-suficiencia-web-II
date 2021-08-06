import { EntityTarget, getRepository } from "typeorm";
import { v4 as uuid } from "uuid";




export async function generateValidModelId<T>(model: EntityTarget<T>): Promise<string> {
    let id = uuid();
    const modelRepository = getRepository(model);
    while (await modelRepository.findOne(id)) {
        id = uuid();
    }
    return id;
}

export function hasOnlyDigits(data: string): boolean {
    return /^\d+$/.test(data);
}