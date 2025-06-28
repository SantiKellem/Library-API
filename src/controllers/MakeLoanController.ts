import { Request, Response } from 'express';
import { MembersModel } from '../models/MembersModel.js';
import { isValidUuid } from '../utils/isValidUuid.js';
import { Loan } from '../domain/entities/Loan.js';
import { CopiesModel } from '../models/CopiesModel.js';
import { Member } from '../domain/entities/Member.js';
import { LoanPolicyModel } from '../models/LoanPolicyModel.js';
import { BooksModel } from '../models/BooksModel.js';
import { LoanModel } from '../models/LoanModel.js';

export class MakeLoanController {
    private _loan?: Loan;
    private member!: Member;
    private numLoanDetails: number = 0;

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
        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        } else if (member?.memberStatus === "Disabled" || member?.memberStatus === "Sanctioned") {
            return res.status(400).json({ message: "Member is 'Disabled' or 'Sanctioned'"});
        } else {
            this.member = member;
            this.loan = Loan.createNewLoan();
            return res.json({ lastName: member.lastName, firstName: member.firstName });
        }
    }

    public async selectCopy(req: Request, res: Response) {
        try {
            this.loan;
            const copyId = req.params.id;

            if (isNaN(+copyId))
                throw new Error("ID sent must be a number");
            
            const copy = await CopiesModel.getCopyById(+copyId);
            if (!copy) 
                return res.status(404).json({ error: "Copy not found" });
           
            const book = await BooksModel.getBookById(copy.bookId);
            if (!book) 
                throw new Error("DB Internal Error");

            const pendingCopies = this.member.getTotalPendings();
            const loanPolicy = await LoanPolicyModel.get();
            if (pendingCopies >= loanPolicy[0].maxPendingBooks) 
                throw new Error("Member has the maximum number of pending copies allowed");

            const bookIsPending = await this.member.isBookPending(book);
            if (bookIsPending) 
                throw new Error("Member has a copy of this book that has not been returned yet");
            
            if (this.loan.isCopyIncluded(copy)) 
                throw new Error("Copy is already included in the current loan");

            this.loan.addCopy(++this.numLoanDetails, copy, book);

            return res.json({ bookTitle: book.title });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    public async confirmLoan(req: Request, res: Response) {
        try {
            this.loan;
            if (this.loan.getCopies().length === 0) 
                throw new Error("No copies selected for the loan");

            this.loan.setDueDates();

            const newLoan = await LoanModel.create(this.loan, this.member.memberId);
            return res.json({ message: "Loan created successfully", loan: newLoan });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}