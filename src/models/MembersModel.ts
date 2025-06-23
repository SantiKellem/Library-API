import { Uuid } from '../interfaces/members.js';
import { MemberSchemaType, MemberPartialSchemaType } from '../utils/validateMember.js';
import { PrismaClient, Member } from '@prisma/client';

const prisma = new PrismaClient()

export class MembersModel {

    static getAll(): Promise<Member[]> {
        return prisma.member.findMany();
    }

    static getById(id: Uuid): Promise<Member | null> {
        return prisma.member.findUnique({
            where: { memberId: id }
        });
    }

    static async create(data: MemberSchemaType): Promise<Member | null> {
        const member = await prisma.member.findUnique({
            where: { email: data.email }
        });
    
        if (member !== null) return null;

        const memberId = crypto.randomUUID();
        return prisma.member.create({
            data: {
                memberId,
                ...data
            }
        });
    }

    static async update(data: MemberPartialSchemaType, id: Uuid): Promise<Member | null | number> {
        const member = await prisma.member.findUnique({
            where: { memberId: id }
        });

        if (data.email) {
            const emailExists = await prisma.member.findFirst({
                where: {
                    email: data.email,
                    memberId: { not: id }
                }
            });
            if (emailExists) return -1;
        }

        if (!member) return null;
    
        return prisma.member.update({
            where: { memberId: id },
            data: { ...data }
        });
    }

    static async delete(id: Uuid): Promise<Member | null> {
        const member = await prisma.member.findUnique({
            where: { memberId: id }
        });
    
        if (!member) return null;
    
        return prisma.member.delete({
            where: { memberId: id }
        });
    }
}