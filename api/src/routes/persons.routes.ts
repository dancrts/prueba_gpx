import { Router } from "express";

import * as PersonasController from "../controllers/persons.controller";

const router = Router();

router.post('/', PersonasController.crearPersona);
router.get('/', PersonasController.obtenerPersonas);
router.get('/:id', PersonasController.obtenerPersonaPorID);
router.put('/:id', PersonasController.actualizarPersona);
router.delete('/:id', PersonasController.borrarPersona);

export default router;