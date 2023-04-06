import { Request, Response } from "express";

export type expressFunction = (req: Request, res: Response) => void;

export type NodeEnvironment = "production" | "development";

export interface JwtPayload {
  id: string;
}

export interface CategoryI {
  _id: string;
  name: string;
}

export interface ProductI {
  _id: string;
  urlPhoto: string;
  name: string;
  describe: string;
  price: number;
  createdAt: string;
}

export interface ProductCategoryI {
  category: CategoryI;
  products: ProductI[];
}
