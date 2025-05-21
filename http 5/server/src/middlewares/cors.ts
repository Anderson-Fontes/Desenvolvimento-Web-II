import { Request, Response, NextFunction } from "express";

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*"); // Ou especifique seu frontend
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};