import { PrismaClient, Copy } from '@prisma/client';

const prisma = new PrismaClient()

export class CopiesModel {

    static getCopies(): Promise<Copy[]> {
        return prisma.copy.findMany({
            orderBy: { copyId: 'asc' },
            include: { Books: true}
        });
    }

    static getCopyById(id: number): Promise<Copy | null> {
        return prisma.copy.findUnique({
            where: { copyId: id },
            include: { Books: true }
        });
    }

    static createCopy(bookId: number): Promise<Copy> {
        return prisma.copy.create({
            data: { bookId: bookId }
        });
    }   

    static async updateCopy(bookId: number, id: number): Promise<Copy | null> {
        const copyExists = await prisma.copy.findUnique({
            where: { copyId: id }
        })
        
        if (!copyExists) return null;

        return prisma.copy.update({
            where: { copyId: id },
            data: { bookId: bookId }
        });
    }

    static async deleteCopy(id: number): Promise<Copy | null> {
        const copyExists = await prisma.copy.findUnique({
            where: { copyId: id }
        })
        
        if (!copyExists) return null;

        return prisma.copy.delete({
            where: { copyId: id }
        });
    }
}