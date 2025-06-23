import { Request, Response } from 'express';
import { BooksModel } from '../models/BooksModel.js';
import { ValidateBook, ValidatePartialBook } from '../utils/validateBook.js';

export class BooksController {
    
    static async getBooks(req: Request, res: Response) {
        const books = await BooksModel.getBooks();
        res.json(books);
    }

    static async getBookById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }
        
        const book = await BooksModel.getBookById(+id);
        if (book == null)
            return res.status(404).json({ error: "Book not found" });
        return res.json(book);
    }

    static async createBook(req: Request, res: Response) {
        const BookData = ValidateBook(req.body);

        if (!BookData.success) 
            return res.status(400).json({ error: JSON.parse(BookData.error.message) });
        
        const newBook = await BooksModel.createBook(BookData.data);
        return res.status(201).json(newBook);
    }

    static async updateBook(req: Request, res: Response) {
        const id = req.params.id;
        const BookData = ValidatePartialBook(req.body);

        if (!BookData.success) 
            return res.status(400).json({ error: JSON.parse(BookData.error.message) });

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const updatedBook = await BooksModel.updateBook(BookData.data, +id);
        if (updatedBook == undefined) 
            return res.status(404).json({ error: "Book not found" }); 
        else 
            return res.status(201).json(updatedBook);
    }

    static async deleteBook(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }
        
        const oldBook = await BooksModel.deleteBook(+id);
        if (oldBook == undefined)
            return res.status(404).json({ error: "Book not found" });
        return res.json(oldBook);
    }
}