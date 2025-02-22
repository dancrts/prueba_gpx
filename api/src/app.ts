import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import express, { NextFunction, Request, Response } from 'express';

//routes
import PeopleRoutes from './routes/people.routes';

//Express
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/personas", PeopleRoutes);

//Errores
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint no encontrado"))
})
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    let errorMessage = "Ha ocurrido un error";
    let statusCode = 500;
    if (isHttpError(error)) {
        errorMessage = error.message
        statusCode = error.statusCode
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app;