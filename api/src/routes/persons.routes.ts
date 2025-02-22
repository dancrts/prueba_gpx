import { Router } from "express";

const router = Router();

router.get('/', (_req, res, _next) => {
    res.send('Hello World');
});

router.get('/:id', (_req, res, _next) => {
    res.send('Hello World');
});

router.post('/', (_req, res, _next) => {
    res.send('Hello World');
});

router.put('/:id', (_req, res, _next) => {
    res.send('Hello World');
});

router.delete('/:id', (_req, res, _next) => {
    res.send('Hello World');
});

export default router;