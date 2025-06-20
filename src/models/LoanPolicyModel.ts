import { LoanPolicy } from "../interfaces/loanPolicy.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let loanPolicy: LoanPolicy = require("../mocks/loanPolicy.json");

export class LoanPolicyModel {

    static get(): LoanPolicy {
        return loanPolicy;
    }

    static create(maxPendingBooks: number): LoanPolicy {
        const newPolicy: LoanPolicy = {
            maxPendingBooks
        }

        loanPolicy = newPolicy;
        return newPolicy;
    }
}