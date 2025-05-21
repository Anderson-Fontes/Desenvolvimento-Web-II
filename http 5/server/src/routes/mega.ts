import { Router } from "express";
import { last } from "../controllers/MegaController";
import { cors } from "../middlewares/cors";

const router = Router();

router.get("/megasena", cors, last);

export default router;