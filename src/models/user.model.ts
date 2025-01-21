import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";
import Role from "./role.model";
import Department from "./department.model";

interface UserAttributes {
  friendly_code: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  status: boolean;
  company: boolean;
  role_id: number;
  department_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  updated_by?: string | null;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  "friendly_code" | "createdAt" | "updatedAt" | "updated_by"
>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public friendly_code!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public phone_number!: string;
  public status!: boolean;
  public company!: boolean;
  public role_id!: number;
  public department_id!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public updated_by?: string | null;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    this.belongsTo(models.Role, { foreignKey: "role_id", targetKey: "id" });
    this.belongsTo(models.Department, {
      foreignKey: "department_id",
      targetKey: "id",
    });
    this.belongsTo(models.User, {
      foreignKey: "updated_by",
      targetKey: "friendly_code",
      as: "updater",
    });
  }
}

User.init(
  {
    friendly_code: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    company: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
