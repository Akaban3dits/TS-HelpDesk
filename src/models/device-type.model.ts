import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

interface DeviceTypeAttributes {
  id: number;
  type_name: string;
  type_code: string;
}

type DeviceTypeCreationAttributes = Optional<
  DeviceTypeAttributes,
  "id"
>;

class DeviceType
  extends Model<DeviceTypeAttributes, DeviceTypeCreationAttributes>
  implements DeviceTypeAttributes
{
  public id!: number;
  public type_name!: string;
  public type_code!: string;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    DeviceType.hasMany(models.Device, {
      foreignKey: "device_type_id",
      as: "devices"
    });
  }
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
  {
    sequelize: sequelize,
    tableName: "device_type",
    modelName: "DeviceType",
    timestamps: false
  }
);

export default DeviceType;