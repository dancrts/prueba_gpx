import "dotenv/config";

//app
import app from './app';

const PORT = parseInt(process.env.PORT || '7000');

const run = () => {
    try {
        app.listen(PORT, () => {
            console.info('Server is running on port ' + PORT);
        });
    } catch (error) {
        console.error(`Error al inicializar el servidor: ${error}`);
    }
}

run();