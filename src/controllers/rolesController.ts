import { Request, Response, NextFunction } from "express";
import * as roleService from "../services/roleService";

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await roleService.getRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const findRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    const role = await roleService.findRoleById(roleId);
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role_name } = req.body;
    const newRole = await roleService.createRole(role_name);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    const { role_name } = req.body;

    const updatedRole = await roleService.updateRole(roleId, role_name);
    res.json(updatedRole);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roleId = parseInt(req.params.id, 10);
    await roleService.deleteRole(roleId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
