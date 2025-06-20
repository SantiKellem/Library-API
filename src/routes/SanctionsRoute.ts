import { Router } from "express";
import { SanctionsController } from "../controllers/SanctionsController.js";

const SanctionsRouter = Router();

SanctionsRouter.get('/', SanctionsController.getSanctions);

SanctionsRouter.post('/', (req, res) => { SanctionsController.createSanction(req, res) });

SanctionsRouter.get('/:id', (req, res) => { SanctionsController.getSanctionById(req, res) });

SanctionsRouter.patch('/:id', (req, res) => { SanctionsController.updateSanction(req, res) });

SanctionsRouter.delete('/:id', (req, res) => { SanctionsController.deleteSanction(req, res) });


export { SanctionsRouter }