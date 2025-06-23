import { BookSchemaType, BookPartialSchemaType } from '../utils/validateBook.js';
import { PrismaClient, Book } from '@prisma/client';

const prisma = new PrismaClient()

export class BooksModel {
    
    static getBooks(): Promise<Book[]> {
        return prisma.book.findMany({
            orderBy: { bookId: 'asc' }
        });
    }

    static getBookById(id: number): Promise<Book | null> {
        return prisma.book.findUnique({
            where: {bookId: id}
        });
    }

    static createBook(data: BookSchemaType): Promise<Book> {
        return prisma.book.create({
            data: { ...data }
        });
    }

    static async updateBook(data: BookPartialSchemaType, id: number): Promise<Book | null> {
        const bookExists = await prisma.book.findUnique({
            where: { bookId: id}
        });

        if (!bookExists) return null;

        return prisma.book.update({
            where: { bookId: id},
            data: { ...data }
        });
    }

    static async deleteBook(id: number): Promise<Book | null> {
        const bookExists = await prisma.book.findUnique({
            where: { bookId: id}
        });

        if (!bookExists) return null;

        return prisma.book.delete({
            where: { bookId: id }
        });
    }
}