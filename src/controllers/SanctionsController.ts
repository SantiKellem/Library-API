import { Request, Response } from 'express';
import { SanctionsModel } from "../models/SanctionsModel.js";
import { ValidateSanction, ValidatePartialSanction } from '../utils/validateSaction.js';

export class SanctionsController {

    static getAll(req: Request, res: Response) {
        const sanctions = SanctionsModel.getAll();
        res.json(sanctions);
    }

    static getById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) 
            return res.status(400).json({ error: "ID sent must be a number" });
        

        const sanction = SanctionsModel.getById(+id);
        if (sanction == undefined) 
            return res.status(404).json({ error: "Sanction not found" });
        return res.json(sanction);
    }

    // TODO --> create
    static create(req: Request, res: Response) {}
    
    static update(req: Request, res: Response) {
        const id = req.params.id;
        const SanctionData = ValidatePartialSanction(req.body);

        if (!SanctionData.success) 
            return res.status(400).json({ error: JSON.parse(SanctionData.error.message) });

        if (isNaN(+id)) 
            return res.status(400).json({ error: "ID sent must be a number" })
        

        const sanction = SanctionsModel.update(SanctionData.data, +id);
        if (sanction == undefined)
            return res.status(404).json({ error: "Sanction not found" })
        return res.status(201).json(sanction);
    }

    static delete(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id))
            return res.status(400).json({ error: "ID sent must be a number" });

        const oldSanction = SanctionsModel.delete(+id);
        if (oldSanction == undefined)
            return res.status(404).json({ error: "Sanction not found" });
        return res.json(oldSanction);
    }
}