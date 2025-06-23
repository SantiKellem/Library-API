import { Request, Response } from 'express';
import { SanctionPoliciesModel } from '../models/SanctionPoliciesModel.js';
import { ValidateSanctionPolicy, ValidatePartialSanctionPolicy } from '../utils/validateSanctionPolicy.js';

export class SanctionPoliciesController {

    static async getAll(req: Request, res: Response) {
        const policies = await SanctionPoliciesModel.getAll();
        res.json(policies);
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id;
        
        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const policy = await SanctionPoliciesModel.getById(+id);
        if (policy == undefined)
            return res.status(404).json({ error: "Sanction Policy not found" });
        return res.json(policy);
    }

    static async create(req: Request, res: Response) {
        const SanctionPolicyData = ValidateSanctionPolicy(req.body);

        if (!SanctionPolicyData.success) {
            return res.status(400).json({ error: JSON.parse(SanctionPolicyData.error.message) });
        }

        const newPolicy = await SanctionPoliciesModel.create(SanctionPolicyData.data);
        return res.status(201).json(newPolicy);
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id;
        const SanctionPolicyData = ValidatePartialSanctionPolicy(req.body);

        if (!SanctionPolicyData.success) {
            return res.status(400).json({ error: JSON.parse(SanctionPolicyData.error.message) });
        }

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const policy = await SanctionPoliciesModel.update(SanctionPolicyData.data, +id);
        if (policy == undefined)
            return res.status(404).json({ error: "Sanction Policy not found" });
        else 
            return res.status(201).json(policy);
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const oldPolicy = await SanctionPoliciesModel.delete(+id);
        if (oldPolicy == undefined)
            return res.status(404).json({ error: "Sanction Policy not found" });
        return res.json(oldPolicy);
    }
}