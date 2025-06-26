import { Router } from "express";
import { MakeLoanController } from "../controllers/MakeLoanController.js";

const MakeLoanRouter = Router();
const mlc = new MakeLoanController();

MakeLoanRouter.get('/searchMember/:id', (req, res) => { mlc.searchMember(req, res) });

MakeLoanRouter.post('/selectCopy/:id', (req, res) => { mlc.selectCopy(req, res) });

// MakeLoanRouter.post('confirmLoan', (req, res) => { mlc.confirmLoan(req, res) });


export { MakeLoanRouter };