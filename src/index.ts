import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.get('/health', (_: Request, res: Response) => {
  res.status(200).send({ message: 'Server is healthy' });
});

// Error Handling Middleware
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
