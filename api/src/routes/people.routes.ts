import { Router } from "express";

import * as PeopleController from "../controllers/people.controller";

const router = Router();

router.post('/', PeopleController.createPerson);
router.get('/', PeopleController.getPeople);
router.get('/:id', PeopleController.getPersonById);
router.put('/:id', PeopleController.updatePerson);
router.delete('/:id', PeopleController.deletePerson);

export default router;