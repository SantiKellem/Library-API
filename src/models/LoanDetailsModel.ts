import { PrismaClient, LoanDetail } from '@prisma/client';

const prisma = new PrismaClient()

export class LoanDetailsModel {

    static getPendingLoanDetail(copyId: number): Promise<LoanDetail[]> {
        return prisma.loanDetail.findMany({
            where: { 
                copyId: copyId,
                loanLineStatus: "Pending"
            }
        });
    }

    // static getPendingsByMember(memberId: number): Promise<LoanDetail[]>{
    //     return prisma.loanDetail.findMany({
    //         where: { 
    //             memberId: memberId,
    //             loanLineStatus: "Pending"
    //         }
    //     });
    // }
}