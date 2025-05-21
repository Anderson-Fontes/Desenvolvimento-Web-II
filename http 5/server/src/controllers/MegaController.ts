import { Request, Response, NextFunction } from "express";
import db from "./db";

export async function last(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await db.query("SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1");
    
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Nenhum concurso encontrado" });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (e: any) {
    console.error("Database error:", e);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}