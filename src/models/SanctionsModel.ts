import { Sanction } from "../interfaces/sanctions.js";
import { getNewId } from "../utils/getNewId.js";
import { SanctionSchemaType, SanctionPartialSchemaType } from "../utils/validateSaction.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Sanctions: Sanction[] = require("../mocks/sanctions.json");

export class SanctionsModel {

    static getAll(): Sanction[] {
        return Sanctions;
    }

    static getById(id: number): Sanction | undefined {
        const sanction = Sanctions.find(s => s.sanctionId == id);
        return sanction;
    }

    static create(data: SanctionSchemaType): Sanction {
        const sanctionId = getNewId(Sanctions, "sanctionId");
        const newSanction: Sanction = {
            sanctionId,
            ...data
        }
        Sanctions.push(newSanction);
        return newSanction;
    }

    static update(data: SanctionPartialSchemaType, id: number): Sanction | undefined {
        const i = Sanctions.findIndex(s => s.sanctionId == id);

        if (i !== -1) {
            const sanction: Sanction = {
                ...Sanctions[i],
                ...data
            }
            Sanctions[i] = sanction;
            return sanction;
        }

        return undefined;
    }

    static delete(id: number): Sanction | undefined {
        const i = Sanctions.findIndex(s => s.sanctionId == id);

        if (i !== -1) {
            const oldSanction = Sanctions[i];
            Sanctions.splice(i, 1);
            return oldSanction;
        }

        return undefined;
    }
}