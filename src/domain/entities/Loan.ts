import { Book, Copy } from "@prisma/client";
import { LoanDetail } from "./LoanDetail.js";

export class Loan {
    private _loanId?: number;
    private _loanDetails: LoanDetail[] = [];

    constructor(
        private loanDate: Date, 
    ){}

    public get loanId(): number | undefined { return this._loanId }
    public get loanDetails(): LoanDetail[] { return this._loanDetails }

    static createNewLoan(loanDate: Date) {
        return new Loan(loanDate)
    }

    public isCopyIncluded(copy: Copy) {
        let isIncluded = false;

        for (let i = 0; i < this.loanDetails.length; i++) {
            if (this.loanDetails[i].copy.copyId === copy.copyId) { 
                isIncluded = true;
                break;
            }
        }
        return isIncluded;
    }

    public addCopy(numLoanDetail: number, copy: Copy, book: Book) {
        const theoreticalReturnDate = new Date();
        theoreticalReturnDate.setDate(theoreticalReturnDate.getDate() + book.maxLoanDays);
        
        this.loanDetails.push(new LoanDetail(numLoanDetail, theoreticalReturnDate, "Pending", copy));
    }
}