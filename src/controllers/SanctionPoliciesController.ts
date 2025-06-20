import { Request, Response } from 'express';
import { SanctionPoliciesModel } from '../models/SanctionPoliciesModel.js';
import { ValidateSanctionPolicy, ValidatePartialSanctionPolicy } from '../utils/validateSanctionPolicy.js';

export class SanctionPoliciesController {

    static getAll(req: Request, res: Response) {
        const policies = SanctionPoliciesModel.getAll();
        res.json(policies);
    }

    static getById(req: Request, res: Response) {
        const id = req.params.id;
        
        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const policy = SanctionPoliciesModel.getById(+id);
        if (policy == undefined)
            return res.status(404).json({ error: "Sanction Policy not found" });
        return res.json(policy);
    }

    static create(req: Request, res: Response) {
        const SanctionPolicyData = ValidateSanctionPolicy(req.body);

        if (!SanctionPolicyData.success) {
            return res.status(400).json({ error: JSON.parse(SanctionPolicyData.error.message) });
        }

        const newPolicy = SanctionPoliciesModel.create(SanctionPolicyData.data);
        return res.status(201).json(newPolicy);
    }

    static update(req: Request, res: Response) {
        const id = req.params.id;
        const SanctionPolicyData = ValidatePartialSanctionPolicy(req.body);

        if (!SanctionPolicyData.success) {
            return res.status(400).json({ error: JSON.parse(SanctionPolicyData.error.message) });
        }

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const policy = SanctionPoliciesModel.update(SanctionPolicyData.data, +id);
        if (policy == undefined)
            return res.status(404).json({ error: "Sanction Policy not found" });
        else 
            return res.status(201).json(policy);
    }

    static delete(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const oldPolicy = SanctionPoliciesModel.delete(+id);
        if (oldPolicy == undefined)
            return res.status(404).json({ error: "Sanction Policy not found" });
        return res.json(oldPolicy);
    }
}