import { Router } from "express";
import { searchController } from "../controllers";

// Extraccion de importaciones
const {buscar} = searchController;

const router: Router = Router();

router.get('/:collection/:term', buscar);


export default router;