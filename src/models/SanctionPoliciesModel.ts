import { SanctionPolicySchemaType, SanctionPolicyPartialSchemaType } from "../utils/validateSanctionPolicy.js";
import { PrismaClient, SanctionPolicy } from '@prisma/client';
const prisma = new PrismaClient()


export class SanctionPoliciesModel {

    static getAll(): Promise<SanctionPolicy[]> {
        return prisma.sanctionPolicy.findMany({
            orderBy: { idSanctionPolicy: 'asc' }
        });
    }

    static getById(id: number): Promise<SanctionPolicy | null> {
        return prisma.sanctionPolicy.findUnique({
            where: { idSanctionPolicy: id }
        })
    }

    static create(data: SanctionPolicySchemaType): Promise<SanctionPolicy> {
        return prisma.sanctionPolicy.create({
            data: { ...data }
        })
    }

    static async update(data: SanctionPolicyPartialSchemaType, id: number): Promise<SanctionPolicy | null> {
        const policyExists = await prisma.sanctionPolicy.findUnique({
            where: { idSanctionPolicy: id }
        })

        if (!policyExists ) return null;

        return prisma.sanctionPolicy.update({
            where: { idSanctionPolicy: id },
            data: { ...data }
        });
    }

    static async delete(id: number): Promise<SanctionPolicy | null> {
        const policyExists = await prisma.sanctionPolicy.findUnique({
            where: { idSanctionPolicy: id }
        })

        if (!policyExists ) return null;

        return prisma.sanctionPolicy.delete({
            where: { idSanctionPolicy: id }
        });
    }
}