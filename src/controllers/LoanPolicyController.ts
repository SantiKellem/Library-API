import { Request, Response } from 'express';
import { LoanPolicyModel } from "../models/LoanPolicyModel.js";

export class LoanPolicyController {

    static get(req: Request, res: Response) {
        const policy = LoanPolicyModel.get();
        res.json(policy);
    }

    static create(req: Request, res: Response) {
        const data = req.body;

        if (isNaN(+data.maxPendingBooks)) 
            return res.status(400).json({ error: "Parameter sent must be a number" });
        
        const newPolicy = LoanPolicyModel.create(+data.maxPendingBooks);
        return res.status(201).json(newPolicy);
    }
}