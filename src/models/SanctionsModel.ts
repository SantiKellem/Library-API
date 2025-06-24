import { UUID } from "crypto";
import { SanctionSchemaType, SanctionPartialSchemaType } from "../utils/validateSaction.js";
import { PrismaClient, Sanction } from '@prisma/client';

const prisma = new PrismaClient()

export class SanctionsModel {

    static getAll(): Promise<Sanction[]> {
        return prisma.sanction.findMany({
            orderBy: { sanctionId: 'asc' },
            include: { Members: true }
        });
    }

    static getById(id: number): Promise<Sanction | null> {
        return prisma.sanction.findUnique({
            where: { sanctionId: id }
        });
    }

    static async create(data: SanctionSchemaType, memberId: UUID): Promise<Sanction | null> {
        const member = await prisma.member.findUnique({
            where: { memberId: memberId }
        });
        
        if (!member) return null;

        return prisma.sanction.create({
            data: { 
                ...data,
                memberId: memberId
            }
        });
    }

    static async update(data: SanctionPartialSchemaType, id: number): Promise<Sanction | null> {
        const sanctionExists = await prisma.sanction.findUnique({
            where: { sanctionId: id }
        });

        if (!sanctionExists) return null;

        return prisma.sanction.update({
            where: { sanctionId: id },
            data: { ...data }
        });
    }

    static async delete(id: number): Promise<Sanction | null> {
        const sanctionExists = await prisma.sanction.findUnique({
            where: { sanctionId: id }
        });

        if (!sanctionExists) return null;

        return prisma.sanction.delete({
            where: { sanctionId: id },
        });
    }
}