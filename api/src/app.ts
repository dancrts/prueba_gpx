import express from 'express';

const PORT = parseInt(process.env.PORT || '7000');

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});