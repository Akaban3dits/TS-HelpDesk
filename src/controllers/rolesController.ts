import { Request, Response } from "express";
import * as roleService from "../services/roleService";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const findRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    const role = await roleService.findRoleById(roleId);
    res.status(200).json(role);
  } catch (error) {
    if ((error as Error).message === "Rol no encontrado") {
      res.status(404).json({ error: "Rol no encontrado" });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role_name } = req.body;
    const newRole = await roleService.createRole(role_name);
    res.status(201).json(newRole);
  } catch (error) {
    if ((error as Error).message === "El nombre de rol ya existe") {
      res.status(400).json({ error: (error as Error).message });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};
