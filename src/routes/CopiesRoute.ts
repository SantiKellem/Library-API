import { Router } from 'express';
import { CopiesController } from '../controllers/CopiesController.js';

const CopiesRouter = Router();

CopiesRouter.get("/", CopiesController.getCopies);

CopiesRouter.post("/", (req, res) => { CopiesController.createCopy(req, res) });

CopiesRouter.get("/:id", (req, res) => { CopiesController.getCopyById(req, res) });

CopiesRouter.patch("/", (req, res) => { CopiesController.updateCopy(req, res) });

CopiesRouter.delete("/:id", (req, res) => { CopiesController.deleteCopy(req, res) });


export { CopiesRouter };