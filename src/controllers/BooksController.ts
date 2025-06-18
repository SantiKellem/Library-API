import { Book } from '../interfaces/books.js';
import { BooksModel } from '../models/BooksModel.js';
import { ValidateBook, ValidatePartialBook } from '../utils/validateBook.js';

export class BooksController {
    
    static getBooks(): Book[]  {
        const books = BooksModel.getBooks();
        return books;
    }

    static getBookById(id: number): Book | undefined  {
        const book = BooksModel.getBookById(id);
        return book;
    }

    static createBook(data: Book): Book | { message: string }{
        const BookData = ValidateBook(data);

        if (!BookData.success) return BookData.error;

        const newBook = BooksModel.createBook(BookData.data);
        return newBook;
    }

    static updateBook(data: Book, id: number): Book | undefined | { message: string } {
        const BookData = ValidatePartialBook(data);

        if (!BookData.success) return BookData.error;

        const updatedBook = BooksModel.updateBook(BookData.data, id);
        return updatedBook;
    }

    static deleteBook(id: number): Book | undefined {
        const oldBook = BooksModel.deleteBook(id);
        return oldBook;
    }
}