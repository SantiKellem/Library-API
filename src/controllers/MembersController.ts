import { Request, Response } from 'express';
import { ValidateMember, ValidatePartialMember } from '../utils/validateMember.js';
import { MembersModel } from '../models/MembersModel.js';
import { isValidUuid } from '../utils/isValidUuid.js';

export class MembersController {

    static async getMembers(req: Request, res: Response) {
        const members = await MembersModel.getAll();
        res.json(members);
    }

    static async getMemberById(req: Request, res: Response) {
        const id = req.params.id;

        if (!isValidUuid(id)) {
            return res.status(400).json({ error: "ID sent must be an UUID"})
        }

        const member = await MembersModel.getById(id);
        if (member == null)
            return res.status(404).json({ error: "Member not found" });
        return res.json(member);
    }

    static async createMember(req: Request, res: Response) {
        const MemberData = ValidateMember(req.body);

        if (!MemberData.success) 
            return res.status(400).json({ error: JSON.parse(MemberData.error.message) });

        const newMember = await MembersModel.create(MemberData.data);
        if (newMember == null)
            return res.status(409).json({ error: "Email already exists" });

        return res.status(201).json(newMember);
    }

    static async updateMember(req: Request, res: Response) {
        const MemberData = ValidatePartialMember(req.body);
        const id = req.params.id;

        if (!MemberData.success) 
            return res.status(400).json({ error: JSON.parse(MemberData.error.message) });

        if (!isValidUuid(id)) {
            return res.status(400).json({ error: "ID sent must be an UUID"})
        }

        const updatedMember = await MembersModel.update(MemberData.data, id);
        if (updatedMember == null)
            return res.status(404).json({ error: "Member not found" });
        else if (updatedMember == -1)
            return res.status(409).json({ error: "Email already exists" });
        return res.status(201).json(updatedMember);
    }

    static async deleteMember(req: Request, res: Response) {
        const id = req.params.id;

        if (!isValidUuid(id)) {
            return res.status(400).json({ error: "ID sent must be an UUID"})
        }

        const oldMember = await MembersModel.delete(id);
        if (oldMember == null)
            return res.status(404).json({ error: "Member not found" });
        return res.json(oldMember);
    }
}