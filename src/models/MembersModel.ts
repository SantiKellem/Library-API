import { UUID } from 'crypto';
import { MemberSchemaType, MemberPartialSchemaType } from '../utils/validateMember.js';
import { PrismaClient, Sanction } from '@prisma/client';
import { Member } from '../domain/entities/Member.js';
import { IMember } from '../domain/interfaces/members.js';
import { Loan } from '../domain/entities/Loan.js';
import { LoanDetail } from '../domain/entities/LoanDetail.js';

const prisma = new PrismaClient()

export class MembersModel {

    static getAll(): Promise<IMember[]> {
        return prisma.member.findMany({
            include: { Sanctions: true }
        });
    }

static async getById(id: UUID): Promise<Member | null> {
    const mem = await prisma.member.findUnique({
        where: { memberId: id },
        include: { 
            Sanctions: true,
            Loans: {
                include: {
                    LoanDetails: {
                        include: { Copy: true}
                    }
                }
            }
        }
    });

    if (!mem) return null;

    const loans: Loan[] = mem.Loans.map(l => {
        const loanDetails: LoanDetail[] = l.LoanDetails.map(ld => {
            return new LoanDetail(
                ld.detailNumber,
                ld.theoreticalReturnDate,
                ld.loanLineStatus,
                ld.Copy
            );
        });

        return new Loan(
            loanDetails,
            l.loanDate,
            l.loanId
        );
    });

    const sanctions: Sanction[] = mem.Sanctions;

    return new Member(
        mem.memberId as UUID,
        mem.firstName,
        mem.lastName,
        mem.email,
        mem.address,
        mem.phone,
        mem.memberStatus,
        sanctions,
        loans
    );
}


    static getByEmail(email: string): Promise<IMember | null> {
        return prisma.member.findFirst({
            where: { email: email },
            include: { Sanctions: true }
        });
    }

    static create(data: MemberSchemaType): Promise<IMember> {
        const memberId = crypto.randomUUID();
        return prisma.member.create({
            data: {
                memberId,
                ...data
            }
        });
    }

    static async update(data: MemberPartialSchemaType, id: UUID): Promise<IMember | null> {
        const member = await prisma.member.findUnique({
            where: { memberId: id }
        });

        if (!member) return null;
    
        return prisma.member.update({
            where: { memberId: id },
            data: { ...data }
        });
    }

    static async delete(id: UUID): Promise<IMember | null> {
        const member = await prisma.member.findUnique({
            where: { memberId: id }
        });
    
        if (!member) return null;
    
        return prisma.member.delete({
            where: { memberId: id }
        });
    }
}