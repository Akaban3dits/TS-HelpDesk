import { Request, Response, NextFunction } from "express";
import * as typeService from "../services/typeService";

export const getTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const types = await typeService.getType();
    res.json(types);
  } catch (error) {
    next(error);
  }
};

export const findTypeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const typeId = parseInt(req.params.id, 10);
    const type = await typeService.findType(typeId);
    res.status(200).json(type);
  } catch (error) {
    next(error);
  }
};

export const createType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type_name, type_code } = req.body;
    const newType = await typeService.createType(type_name, type_code);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

export const updateType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const typeId = parseInt(req.params.id, 10);
    const { type_name, type_code } = req.body;
    const updatedType = await typeService.updateType(
      typeId,
      type_name,
      type_code
    );
    res.json(updatedType);
  } catch (error) {
    next(error);
  }
};

export const deleteType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const typeId = parseInt(req.params.id, 10);
    await typeService.deleteType(typeId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const searchType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const search = req.query.search as string | undefined;
  const types = await typeService.searchType(search);
  res.status(200).json(types);
};
