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

export async function getByNumber(req: Request, res: Response): Promise<void> {
  const numero = parseInt(req.params.numero);
  if (isNaN(numero)) {
    res.status(400).json({ message: "Número inválido" });
    return;
  }
  try {
    const result = await db.query("SELECT * FROM megasena WHERE concurso = $1", [numero]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Concurso não encontrado" });
      return;
    }
    res.json(result.rows[0]);
  } catch (e: any) {
    console.error("Erro ao buscar concurso:", e);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
