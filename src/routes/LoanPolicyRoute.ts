import { Router } from "express";
import { LoanPolicyController } from "../controllers/LoanPolicyController.js";

const LoanPolicyRouter = Router();

LoanPolicyRouter.get('/', LoanPolicyController.get);

LoanPolicyRouter.post('/', (req, res) => { LoanPolicyController.create(req, res) });


export { LoanPolicyRouter }