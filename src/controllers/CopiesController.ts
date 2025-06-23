import { Request, Response } from 'express';
import { CopiesModel } from '../models/CopiesModel.js';
import { BooksModel } from '../models/BooksModel.js';

export class CopiesController {

    static async getCopies(req: Request, res: Response) {
        const copies = await CopiesModel.getCopies();
        res.json(copies);
    }

    static async getCopyById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const copy = await CopiesModel.getCopyById(+id)
        if (copy == undefined) 
            return res.status(404).json({ error: "Copy not found" });

        return res.json(copy);
    }

    static async createCopy(req: Request, res: Response) {
        const { bookId } = req.body;
    
        if (isNaN(+bookId)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const book = await BooksModel.getBookById(+bookId);
        if (book == undefined) 
            return res.status(404).json({ error: "Book not found" });

        const newCopy = await CopiesModel.createCopy(book.bookId);
        return res.status(201).json(newCopy);
    }

    static async updateCopy(req: Request, res: Response) {
        const { copyId, bookId } = req.body;
        const book = await BooksModel.getBookById(+bookId);

        if (book == undefined) 
            return res.status(404).json({ error: "Book not found" });

        if (isNaN(+copyId)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const updatedCopy = await CopiesModel.updateCopy(book.bookId, +copyId);
        if (updatedCopy == undefined)
            return res.status(404).json({ error: "Copy not found" });

        return res.status(201).json(updatedCopy);
    }

    static async deleteCopy(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const oldCopy = await CopiesModel.deleteCopy(+id);
        if (oldCopy == undefined)
            return res.status(404).json({ error: "Copy not found" });
        
        return res.json(oldCopy);
    }
}