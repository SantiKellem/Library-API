import { Router } from "express";
import { SanctionPoliciesController } from "../controllers/SanctionPoliciesController.js";

const SanctionPoliciesRouter = Router();

SanctionPoliciesRouter.get('/', SanctionPoliciesController.getAll);

SanctionPoliciesRouter.post('/', (req, res) => { SanctionPoliciesController.create(req, res) });

SanctionPoliciesRouter.get('/:id', (req, res) => { SanctionPoliciesController.getById(req, res) });

SanctionPoliciesRouter.patch('/:id', (req, res) => { SanctionPoliciesController.update(req, res) });

SanctionPoliciesRouter.delete('/:id', (req, res) => { SanctionPoliciesController.delete(req, res) });


export { SanctionPoliciesRouter }