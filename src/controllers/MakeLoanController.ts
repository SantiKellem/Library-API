import { Request, Response } from 'express';
import { MembersModel } from '../models/MembersModel.js';
import { isValidUuid } from '../utils/isValidUuid.js';
import { DateTime } from 'luxon';
import { Loan } from '../domain/Loan.js';

export class MakeLoanController {
    private _loan?: Loan;

    private get loan(): Loan {
        if (!this._loan) throw new Error("Need to search for a Member before continuing");
        return this._loan;
    }

    private set loan(loan: Loan) {
        this._loan = loan;
    }

    public async searchMember(req: Request, res: Response) {
        const memberId = req.params.id;

        if (!isValidUuid(memberId)) 
            return res.status(400).json({ error: "ID sent must be an UUID" }); 

        const member = await MembersModel.getById(memberId);
        if (!member) 
            return res.status(404).json({ error: "Member not found" });
        else if (member?.memberStatus === "Disabled" || member?.memberStatus === "Sanctioned")
            return res.status(400).json({ message: "Member is 'Disabled' or 'Sanctioned'"});
        else {
            this.loan = Loan.createNewLoan(DateTime.now().setZone("America/Argentina/Buenos_Aires").toJSDate(), member);
            return res.json(member);
        }
    }

    // public async selectBook(req: Request, res: Response) {}

    // public async confirmLoan(req: Request, res: Response) {}
}