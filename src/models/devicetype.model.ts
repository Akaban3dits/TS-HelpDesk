import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface DeviceTypeAttributes {
  id: number;
  type_name: string;
  type_code: string;
}

type DeviceTypeCreationAttributes = Optional<DeviceTypeAttributes, "id">;

class DeviceType
  extends Model<DeviceTypeAttributes, DeviceTypeCreationAttributes>
  implements DeviceTypeAttributes
{
  public id!: number;
  public type_name!: string;
  public type_code!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DeviceType.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    type_code: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    type_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, tableName: "device_type", modelName: "DeviceType" }
);

export default DeviceType;
