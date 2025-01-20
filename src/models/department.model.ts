import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../config/database";

interface DepartmentAttributes {
  id: number;
  department_name: string;
}

type DepartmentCreationAttributes = Optional<DepartmentAttributes, "id">;

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id!: number;
  public department_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Department.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    department_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    modelName: "Department",
    tableName: "departments",
  }
);

export default Department;
