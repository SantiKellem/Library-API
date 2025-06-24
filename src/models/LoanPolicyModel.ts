import { PrismaClient, LoanPolicy } from '@prisma/client';

const prisma = new PrismaClient()

export class LoanPolicyModel {

    static get(): Promise<LoanPolicy[]> {
        return prisma.loanPolicy.findMany();
    }

    static create(maxPendingBooks: number): Promise<LoanPolicy> {
        return prisma.loanPolicy.create({
            data: { maxPendingBooks: maxPendingBooks }
        })
    }
}