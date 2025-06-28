import { PrismaClient, Loan as PrismaLoan } from '@prisma/client';
import { Loan } from '../domain/entities/Loan.js';
import { UUID } from 'crypto';

const prisma = new PrismaClient()

export class LoanModel {

    static getByMember(memberId: UUID): Promise<PrismaLoan[]> {
        return prisma.loan.findMany({
            where: { memberId: memberId },
            include: { LoanDetails: true }
        })
    }

    static create(loan: Loan, memberId: UUID): Promise<PrismaLoan> {
        return prisma.loan.create({
            data: {
                loanId: loan.loanId,
                loanDate: new Date(),
                memberId: memberId,
                LoanDetails: {
                    create: loan.loanDetails.map(ld => ({
                        loanId: loan.loanId,
                        detailNumber: ld.detailNumber,
                        theoreticalReturnDate: ld.theoreticalReturnDate,
                        loanLineStatus: ld.loanLineStatus,
                        copyId: ld.copy.copyId,
                    }))
                }
            },
            include: { LoanDetails: true }
        })
    }
}