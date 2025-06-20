import express from 'express';
import { BooksRouter } from './routes/BooksRoute.js';
import { CopiesRouter } from './routes/CopiesRoute.js';
import { SanctionPoliciesRouter } from './routes/SanctionPoliciesRoute.js';
import { LoanPolicyRouter } from './routes/LoanPolicyRoute.js';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/books", BooksRouter);
app.use("/copies", CopiesRouter);
app.use("/sanctionPolicies", SanctionPoliciesRouter);
app.use("/loanPolicy", LoanPolicyRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})