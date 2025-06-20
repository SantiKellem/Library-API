import { Router } from "express";
import { SanctionsController } from "../controllers/SanctionsController.js";

const SanctionsRouter = Router();

SanctionsRouter.get('/', SanctionsController.getAll);

SanctionsRouter.post('/', (req, res) => { SanctionsController.create(req, res) });

SanctionsRouter.get('/:id', (req, res) => { SanctionsController.getById(req, res) });

SanctionsRouter.patch('/:id', (req, res) => { SanctionsController.update(req, res) });

SanctionsRouter.delete('/:id', (req, res) => { SanctionsController.delete(req, res) });


export { SanctionsRouter }