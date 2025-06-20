import { Router } from 'express';
import { BooksController } from '../controllers/BooksController.js';

const BooksRouter = Router();

BooksRouter.get('/', BooksController.getBooks);

BooksRouter.post('/', (req, res) => { BooksController.createBook(req, res) });

BooksRouter.get('/:id', (req, res) => { BooksController.getBookById(req, res) });

BooksRouter.patch('/:id', (req, res) => { BooksController.updateBook(req, res) });

BooksRouter.delete('/:id', (req, res) => { BooksController.deleteBook(req, res) });


export { BooksRouter };