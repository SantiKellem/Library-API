import express from 'express';
import LibrosRouter from './routes/NotasRoute.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/libros", LibrosRouter());

app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})