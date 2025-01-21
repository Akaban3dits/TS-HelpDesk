import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

interface DepartmentAttributes {
  id: number;
  department_name: string;
}

type DepartmentCreationAttributes = Optional<
  DepartmentAttributes,
  "id"
>;

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id!: number;
  public department_name!: string;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    Department.hasMany(models.User, {
      foreignKey: "department_id",
      as: "users"
    });
  }
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
    }
  },
  {
    sequelize: sequelize,
    modelName: "Department",
    tableName: "departments",
    timestamps: false
  }
);

export default Department;