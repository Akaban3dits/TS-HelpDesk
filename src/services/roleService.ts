import Role from "../models/role.model";

export const getRoles = async () => {
  return await Role.findAll();
};

export const findRoleById = async (roleId: number) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new Error("Rol no encontrado");
  return role;
};

export const createRole = async (role_name: string) => {
  const existingRole = await Role.findOne({
    where: {
      role_name: role_name,
    },
  });

  if (existingRole) {
    throw new Error("El nombre de rol ya existe");
  }
  const newRole = await Role.create({ role_name });
  return newRole;
};
