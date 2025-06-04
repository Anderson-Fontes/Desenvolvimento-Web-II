import { Router } from "express";
import { last, getByNumber } from "../controllers/MegaController";
import { cors } from "../middlewares/cors";

const router = Router();

router.get("/megasena", cors, last);
router.get("/megasena/:numero", cors, getByNumber); // <- nova rota

export default router;
