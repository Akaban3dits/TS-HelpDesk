import { Op } from "sequelize";
import Department from "../models/department.model";
import { NotFoundError, ConflictError } from "../utils/error";

export const getDepartments = async () => {
  return await Department.findAll();
};

export const findDepartmentById = async (departmentId: number) => {
  const department = await Department.findByPk(departmentId);
  if (!department) throw new NotFoundError("Rol no encontrado");
  return department;
};

export const createDepartment = async (department_name: string) => {
  const existingdepartment = await Department.findOne({
    where: { department_name: department_name },
  });

  if (existingdepartment)
    throw new ConflictError("El nombre del departmento ya existe");

  return await Department.create({ department_name });
};

export const updateDepartment = async (
  departmentId: number,
  department_name: string
) => {
  const department = await Department.findByPk(departmentId);
  if (!department) throw new NotFoundError("El departamento no existe");

  const existingdepartment = await Department.findOne({
    where: { department_name },
  });

  if (existingdepartment)
    throw new ConflictError("El nombre del departmento ya existe");

  await department.update({ department_name });
  return department;
};

export const deleteDepartment = async (departmentId: number) => {
  const department = await Department.findByPk(departmentId);
  if (!department) throw new NotFoundError("El rol no existe");

  await department.destroy();
};

export const countDepartments = async () => {
  const count = await Department.count();
  if (count === 0) throw new NotFoundError("No hay departamentos disponibles");
  return count;
};

export const searchDepartment = async (search?: string, limit: number = 10) => {
  const whereCondition = search
    ? { department_name: { [Op.iLike]: `%${search}%` } }
    : {};

  const departments = await Department.findAll({
    where: whereCondition,
    limit,
  });

  return departments;
};
