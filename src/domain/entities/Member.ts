import { UUID } from 'crypto';
import { MemberStatus } from '../interfaces/members.js'
import { LoanDetailsModel } from '../../models/LoanDetailsModel.js';
import { Book, Copy, LoanDetail, Sanction } from '@prisma/client';
import { Loan } from './Loan.js';
import { CopiesModel } from '../../models/CopiesModel.js';

export class Member {
    constructor(
        private _memberId: UUID,
        private _firstName: string,
        private _lastName: string,
        private _email: string,
        private _address: string,
        private _phone: string,
        private _memberStatus: MemberStatus,
        private _sanctions: Sanction[],
        private _loans: Loan[]
    ){}

    public get memberId(): UUID { return this._memberId }
    public get firstName(): string { return this._firstName }
    public get lastName(): string { return this._lastName }
    public get email(): string { return this._email }
    public get address(): string { return this._address }
    public get phone(): string { return this._phone }
    public get memberStatus(): string { return this._memberStatus }
    public get sanctions(): Sanction[] { return this._sanctions }
    public get loans(): Loan[] { return this._loans }

    public getPendingLoanDetail(copy: Copy): Promise<LoanDetail[]> {
        return LoanDetailsModel.getPendingLoanDetail(copy.copyId);
    }

    public async isBookPending(book: Book): Promise<boolean> {
        let isBookPending = false;

        for (let i = 0; i < this.loans.length; i++) {
            for (let k = 0; k < this.loans[i].loanDetails.length; k++) {
                const pendingBook = await CopiesModel.getCopyById(this.loans[i].loanDetails[k].copy.copyId);
                if (book.bookId == pendingBook?.bookId) {
                    isBookPending = true;
                    break;
                }
            }
            if (isBookPending) break;
        }
        return isBookPending;
    }

    public getTotalPendings(): number {
        let count = 0;
        
        this.loans.forEach(l => {
            l.loanDetails.forEach(ld => {
                if (ld.loanLineStatus === "Pending") count++;
            });
        });

        return count;
    }
}