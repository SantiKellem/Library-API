import { SanctionPolicy } from "../interfaces/sanctionPolicies.js";
import { getNewId } from '../utils/getNewId.js';
import { SanctionPolicySchemaType, SanctionPolicyPartialSchemaType } from "../utils/validateSanctionPolicy.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const SanctionPolicies: SanctionPolicy[] = require("../mocks/sanctionPolicies.json");

export class SanctionPoliciesModel {

    static getAll(): SanctionPolicy[] {
        return SanctionPolicies;
    }

    static getById(id: number): SanctionPolicy | undefined {
        const policy = SanctionPolicies.find(sp => sp.idSanctionPolicy == id);
        return policy;
    }

    static create(data: SanctionPolicySchemaType): SanctionPolicy {
        const idSanctionPolicy = getNewId(SanctionPolicies, "idSanctionPolicy");
        const newPolicy: SanctionPolicy = {
            idSanctionPolicy,
            ...data
        };
        SanctionPolicies.push(newPolicy);
        return newPolicy;
    }

    static update(data: SanctionPolicyPartialSchemaType, id: number): SanctionPolicy | undefined {
        const i = SanctionPolicies.findIndex(sp => sp.idSanctionPolicy == id);

        if (i !== -1) {
            const policy: SanctionPolicy = {
                ...SanctionPolicies[i],
                ...data
            }
            SanctionPolicies[i] = policy;
            return policy;
        }

        return undefined;
    }

    static delete(id: number): SanctionPolicy | undefined {
        const i = SanctionPolicies.findIndex(sp => sp.idSanctionPolicy == id);

        if(i !== -1) {
            const oldPolicy = SanctionPolicies[i];
            SanctionPolicies.splice(i, 1);
            return oldPolicy;
        }

        return undefined;
    }
}