import { Router } from 'express';
import { BooksController } from '../controllers/BooksController.js';

const BooksRouter = Router();

BooksRouter.get('/', (req, res) => {
    const books = BooksController.getBooks();
    res.json(books);
});

BooksRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const book = BooksController.getBookById(+id);
    res.json(book);
})

BooksRouter.post('/createBook', (req, res) => {
    const newBook = BooksController.createBook(req.body);
    res.status(201).json(newBook);
})

BooksRouter.patch('/updateBook/:id', (req, res) => {
    const id = req.params.id;
    const book = BooksController.updateBook(req.body, +id);
    res.json(book);
})

BooksRouter.delete('/deleteBook/:id', (req, res) => {
    const id = req.params.id;
    const book = BooksController.deleteBook(+id);
    res.json(book);
})

export { BooksRouter };