import { Request, Response } from 'express';
import { BooksModel } from '../models/BooksModel.js';
import { ValidateBook, ValidatePartialBook } from '../utils/validateBook.js';

export class BooksController {
    
    static getBooks(req: Request, res: Response) {
        const books = BooksModel.getBooks();
        res.json(books);
    }

    static getBookById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }
        
        const book = BooksModel.getBookById(+id);
        if (book == undefined)
            return res.status(404).json({ error: "Book not found" });
        return res.json(book);
    }

    static createBook(req: Request, res: Response) {
        const BookData = ValidateBook(req.body);

        if (!BookData.success) 
            return res.status(400).json({ error: JSON.parse(BookData.error.message) });
        
        const newBook = BooksModel.createBook(BookData.data);
        return res.status(201).json(newBook);
    }

    static updateBook(req: Request, res: Response) {
        const id = req.params.id;
        const BookData = ValidatePartialBook(req.body);

        if (!BookData.success) 
            return res.status(400).json({ error: JSON.parse(BookData.error.message) });

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const updatedBook = BooksModel.updateBook(BookData.data, +id);
        if (updatedBook == undefined) 
            return res.status(404).json({ error: "Book not found" }); 
        else 
            return res.status(201).json(updatedBook);
    }

    static deleteBook(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }
        
        const oldBook = BooksModel.getBookById(+id);
        if (oldBook == undefined)
            return res.status(404).json({ error: "Book not found" });
        return res.json(oldBook);
    }
}