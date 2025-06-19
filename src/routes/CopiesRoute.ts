import { Router } from 'express';
import { CopiesController } from '../controllers/CopiesController.js';

const CopiesRouter = Router();

CopiesRouter.get("/", CopiesController.getCopies);

CopiesRouter.post("/", (req, res) => { CopiesController.createCopy(req, res) });

CopiesRouter.get("/:id", CopiesController.getCopyById);

CopiesRouter.patch("/", (req, res) => { CopiesController.updateCopy(req, res) });

CopiesRouter.delete("/:id", CopiesController.deleteCopy);


export { CopiesRouter };