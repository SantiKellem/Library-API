import { Request, Response } from 'express';
import { ValidateMember, ValidatePartialMember } from '../utils/validateMember.js';
import { MembersModel } from '../models/MembersModel.js';

export class MembersController {

    static getMembers(req: Request, res: Response) {
        const members = MembersModel.getAll();
        res.json(members);
    }

    static getMemberById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id))
            return res.status(400).json({ error: "ID sent must be a number" });

        const member = MembersModel.getById(+id);
        if (member == undefined)
            return res.status(404).json({ error: "Member not found" });
        return res.json(member);
    }

    static createMember(req: Request, res: Response) {
        const MemberData = ValidateMember(req.body);

        if (!MemberData.success) 
            return res.status(400).json({ error: JSON.parse(MemberData.error.message) });

        const newMember = MembersModel.create(MemberData.data);
        return res.status(201).json(newMember);
    }

    static updateMember(req: Request, res: Response) {
        const MemberData = ValidatePartialMember(req.body);
        const id = req.params.id;

        if (!MemberData.success) 
            return res.status(400).json({ error: JSON.parse(MemberData.error.message) });

        if (isNaN(+id))
            return res.status(400).json({ error: "ID sent must be a number" });

        const updatedMember = MembersModel.update(MemberData.data, +id);
        if (updatedMember == undefined)
            return res.status(404).json({ error: "Member not found" });
        return res.status(201).json(updatedMember);
    }

    static deleteMember(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id))
            return res.status(400).json({ error: "ID sent must be a number" });

        const oldMember = MembersModel.delete(+id);
        if (oldMember == undefined)
            return res.status(404).json({ error: "Member not found" });
        return res.json(oldMember);
    }
}