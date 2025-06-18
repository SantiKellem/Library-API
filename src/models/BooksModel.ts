import { Book } from '../interfaces/books';
import { BookSchemaType, BookPartialSchemaType } from '../utils/validateBook.js';
import { getNewId } from '../utils/getNewId.js'
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const Books: Book[]  = require("../mocks/books.json");


export class BooksModel {
    
    static getBooks(): Book[] {
        return Books;
    }

    static getBookById(id: number): Book | undefined {
        const book = Books.find(b => b.bookId == id);
        return book;
    }

    static createBook(data: BookSchemaType): Book {
        const bookId = getNewId();
        const newBook: Book = {
            bookId,
            ...data
        }
        Books.push(newBook);
        return newBook;
    }

    static updateBook(data: BookPartialSchemaType, id: number) {
        const bookIndex = Books.findIndex(b => b.bookId == id);

        if (bookIndex != -1) {
            const book: Book = {
                ...Books[bookIndex],
                ...data
            }
            Books[bookIndex] = book;
            return book; 
        }

        return undefined;
    }

    static deleteBook(id: number): Book | undefined {
        const bookIndex = Books.findIndex(b => b.bookId == id);
        
        if (bookIndex != -1) {
            Books.splice(bookIndex, 1);
            return Books[bookIndex];
        }
        
        return undefined;
    }
}