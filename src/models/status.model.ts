import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface StatusAttributes {
  id: number;
  status_name: string;
}

type StatusCreationAttributes = Optional<StatusAttributes, "id">;

class Status
  extends Model<StatusAttributes, StatusCreationAttributes>
  implements StatusAttributes
{
  public id!: number;
  public status_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Status.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    status_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, tableName: "status", modelName: "Status" }
);

export default Status;
