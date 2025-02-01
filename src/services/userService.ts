import { Op } from "sequelize";
import User from "../models/user.model";
import Role from "../models/role.model";
import Department from "../models/department.model";

export const getUsers = async (
  search?: string,
  orderBy: string = "friendly_code",
  order: string = "ASC",
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;
  const whereCondition = search
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const { count, rows } = await User.findAndCountAll({
    where: whereCondition,
    order: [[orderBy, order]],
    limit,
    offset,
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Role,
        as: "role",
      },
      {
        model: Department,
        as: "department",
      },
      {
        model: User,
        as: "updater",
      },
    ],
  });

  return {
    total: count,
    rows,
    page,
    pageSize: limit,
    totalPages: Math.ceil(count / limit),
  };
};
