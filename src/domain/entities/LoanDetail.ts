import { Copy, loanlinestatus_enum } from "@prisma/client";


export class LoanDetail {
    constructor (
        private _detailNumber: number,
        private _theoreticalReturnDate: Date,
        private _loanLineStatus: loanlinestatus_enum,
        private _copy: Copy,
        private _actualReturnDate?: Date,
    ){}

    public get detailNumber(): number { return this._detailNumber }
    public get theoreticalReturnDate(): Date { return this._theoreticalReturnDate }
    public set actualReturnDate(date: Date) { this._actualReturnDate = date }
    public get actualReturnDate(): Date | undefined {return this._actualReturnDate }
    public get loanLineStatus(): loanlinestatus_enum { return this._loanLineStatus }
    public set memberId(status: loanlinestatus_enum) { this._loanLineStatus = status }
    public get copy(): Copy { return this._copy }
    public set copy(copy: Copy) { this._copy = copy }
    
    public setDueDate(dueDate: Date) {
        this._theoreticalReturnDate = dueDate;
    }
}