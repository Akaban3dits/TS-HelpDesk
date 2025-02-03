import { Request, Response, NextFunction } from "express";
import * as departmentService from "../services/departmentService";

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await departmentService.getDepartments();
    res.json(departments);
  } catch (error) {
    next(error);
  }
};

export const findDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = parseInt(req.params.id, 10);
    const department = await departmentService.findDepartmentById(departmentId);
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { department_name } = req.body;
    const newDepartment = await departmentService.createDepartment(
      department_name
    );
    res.status(201).json(newDepartment);
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = parseInt(req.params.id, 10);
    const { department_name } = req.body;

    const updatedDepartment = await departmentService.updateDepartment(
      departmentId,
      department_name
    );
    res.json(updatedDepartment);
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = parseInt(req.params.id, 10);
    await departmentService.deleteDepartment(departmentId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const countDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await departmentService.countDepartments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

export const searchDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string | undefined;

    const departments = await departmentService.searchDepartment(search);
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};
