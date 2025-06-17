import { Router } from 'express';
import { LibrosController } from '../controllers/LibrosController.js';

export function NotasRouter() {
    const router = Router();

    router.get('/', (req, res) => {
        const libro = LibrosController.getLibros();
        res.json(libro);
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        const libro = LibrosController.getLibroById(+id);
        res.json(libro);
    })

    router.post('/', (req, res) => {
        const { titulo, contenido, fecha } = req.body;
        const nuevoLibro = LibrosController.crearLibro(titulo, contenido, fecha);
        res.status(201).json(nuevoLibro);
    })

    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const libro = LibrosController.updateLibro(req.body, +id);
        res.json(libro);
    })

    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        const libro = LibrosController.deleteLibro(+id);
        res.json(libro);
    })

    return router;
}