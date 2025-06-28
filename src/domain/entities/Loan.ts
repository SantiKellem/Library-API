import { Book, Copy } from "@prisma/client";
import { LoanDetail } from "./LoanDetail.js";
import { BooksModel } from "../../models/BooksModel.js";

export class Loan {
    
    constructor(
        private _loanDetails: LoanDetail[],
        private loanDate: Date,
        private _loanId?: number
    ) {}

    public get loanId(): number | undefined { return this._loanId }
    public set loanId(loanId: number) { this._loanId = loanId }
    public get loanDetails(): LoanDetail[] { return this._loanDetails }

    static createNewLoan() {
        return new Loan([], new Date());
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

    public getCopies() {
        return this.loanDetails.map(detail => detail.copy);
    }

    public async setDueDates(): Promise<void> {
        for (let i = 0; i < this.loanDetails.length; i++) {
            const dueDate = new Date();
            const book = await BooksModel.getBookById(this.loanDetails[i].copy.bookId);
            if (!book) throw Error("Internal DB error: Copy's Book do not exists");
            dueDate.setDate(dueDate.getDate() + book?.maxLoanDays);
            this.loanDetails[i].setDueDate(dueDate);
        }
    }
}