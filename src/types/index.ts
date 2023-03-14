import { Request, Response } from "express";

export type expressFunction = (req: Request, res: Response) => void;

export type NodeEnvironment = "production" | "development";

export interface JwtPayload {
  id: string;
}
