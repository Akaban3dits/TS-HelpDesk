import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const {
      search,
      orderBy = "friendly_code",
      order = "ASC",
      page = "1",
      limit = "10",
    } = req.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;

    const result = await userService.getUsers(
      search as string,
      orderBy as string,
      order as string,
      pageNumber,
      pageSize
    );

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};
