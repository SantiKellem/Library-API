import { Router } from "express";
import { MembersController } from "../controllers/MembersController.js";

const MembersRouter = Router();

MembersRouter.get('/', MembersController.getMembers);

MembersRouter.post('/', (req, res) => { MembersController.createMember(req, res) });

MembersRouter.get('/:id', (req, res) => { MembersController.getMemberById(req, res) });

MembersRouter.patch('/:id', (req, res) => { MembersController.updateMember(req, res) });

MembersRouter.delete('/:id', (req, res) => { MembersController.deleteMember(req, res) });


export { MembersRouter }