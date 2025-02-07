import DeviceType from "../models/device-type.model";
import { Op } from "sequelize";
import { NotFoundError, ConflictError } from "../utils/error";

export const getType = async () => {
  return await DeviceType.findAll();
};

export const findType = async (typeId: number) => {
  const type = await DeviceType.findByPk(typeId);
  if (!type) throw new NotFoundError("Tipo de dispositivo no encontrado");
  return type;
};

export const createType = async (type_name: string, type_code: string) => {
  const existingtype = await DeviceType.findOne({
    where: { type_name: type_name },
  });
  if (existingtype) throw new ConflictError("El nombre del tipo ya existe");

  const existingcode = await DeviceType.findOne({
    where: { type_code: type_code },
  });
  if (existingtype) throw new ConflictError("El codigo del tipo ya existe");

  return await DeviceType.create({ type_name, type_code });
};

export const updateType = async (
  typeId: number,
  type_name: string,
  type_code: string
) => {
  const type = await DeviceType.findByPk(typeId);
  if (!type) throw new NotFoundError("Tipo de dispositivo no encontrado");

  const existingtype = await DeviceType.findOne({
    where: { type_name: type_name },
  });
  if (existingtype) throw new ConflictError("El nombre del tipo ya existe");

  const existingcode = await DeviceType.findOne({
    where: { type_code: type_code },
  });
  if (existingtype) throw new ConflictError("El codigo del tipo ya existe");

  await type.update({ type_name, type_code });
  return type;
};

export const deleteType = async (typeId: number) => {
  const type = await DeviceType.findByPk(typeId);
  if (!type) throw new NotFoundError("Tipo de dispositivo no encontrado");

  await type.destroy();
};

export const searchType = async (search?: string, limit: number = 10) => {
  const whereCondition = search
    ? {
        [Op.or]: [
          { type_code: { [Op.iLike]: `%${search}%` } },
          { type_name: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const types = await DeviceType.findAll({
    where: whereCondition,
    limit,
  });
  return types;
};
