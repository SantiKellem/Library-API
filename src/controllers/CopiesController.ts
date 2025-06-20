import { Request, Response } from 'express';
import { CopiesModel } from '../models/CopiesModel.js';
import { BooksModel } from '../models/BooksModel.js';

export class CopiesController {

    static getCopies(req: Request, res: Response) {
        const copies = CopiesModel.getCopies();
        res.json(copies);
    }

    static getCopyById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const copy = CopiesModel.getCopyById(+id)
        if (copy == undefined) 
            return res.status(404).json({ error: "Copy not found" });

        return res.json(copy);
    }

    static createCopy(req: Request, res: Response) {
        const { bookId } = req.body;
    
        if (isNaN(+bookId)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const book = BooksModel.getBookById(+bookId);
        if (book == undefined) 
            return res.status(404).json({ error: "Book not found" });

        const newCopy = CopiesModel.createCopy(book);
        return res.status(201).json(newCopy);
    }

    static updateCopy(req: Request, res: Response) {
        const { copyId, bookId } = req.body;
        const book = BooksModel.getBookById(+bookId);

        if (book == undefined) 
            return res.status(404).json({ error: "Book not found" });

        if (isNaN(+copyId)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const updatedCopy = CopiesModel.updateCopy(book, +copyId);
        if (updatedCopy == undefined)
            return res.status(404).json({ error: "Copy not found" });

        return res.status(201).json(updatedCopy);
    }

    static deleteCopy(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(+id)) {
            return res.status(400).json({ error: "ID sent must be a number" });
        }

        const oldCopy = CopiesModel.deleteCopy(+id);
        if (oldCopy == undefined)
            return res.status(404).json({ error: "Copy not found" });
        
        return res.json(oldCopy);
    }
}