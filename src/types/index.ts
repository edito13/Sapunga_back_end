import { Request, Response } from "express";

export type expressFunction = (req: Request, res: Response) => void;
