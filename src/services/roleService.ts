import Role from "../models/role.model";
import { NotFoundError, ConflictError } from "../utils/error";

export const getRoles = async () => {
  return await Role.findAll();
};

export const findRoleById = async (roleId: number) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new NotFoundError("Rol no encontrado");
  return role;
};

export const createRole = async (role_name: string) => {
  const existingRole = await Role.findOne({ where: { role_name } });
  if (existingRole) throw new ConflictError("El nombre de rol ya existe");

  return await Role.create({ role_name });
};

export const updateRole = async (roleId: number, role_name: string) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new NotFoundError("El rol no existe");

  const existingRole = await Role.findOne({ where: { role_name } });
  if (existingRole && existingRole.id !== roleId) {
    throw new ConflictError("El nombre de rol ya está en uso");
  }

  await role.update({ role_name });
  return role;
};

export const deleteRole = async (roleId: number) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new NotFoundError("El rol no existe");

  await role.destroy();
};
