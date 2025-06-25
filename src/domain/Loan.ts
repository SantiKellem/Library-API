import { Member } from "../domain/Member.js";
import { LoanDetail } from "../domain/LoanDetail.js";
import { DateTime } from "luxon";
import { Book } from "./books.js";

export class Loan {
    private loanId?: number;
    private loanDetails: LoanDetail[] = [];

    constructor(
        private loanDate: Date, 
        private member: Member
    ){}

    static createNewLoan(loanDate: Date, member: Member) {
        return new Loan(loanDate, member)
    }

    // public addBook(book: Book ) {
    //     const loanDet = LoanDetail.createNew();
    //     this.loanDetails.push(loanDet);
    // }
}