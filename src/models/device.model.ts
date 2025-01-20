import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../config/database";
import DeviceType from "./devicetype.model";

interface DeviceAttributes {
  id: number;
  device_name: string;
  device_type_id: number;
}

type DeviceCreationAttributes = Optional<DeviceAttributes, "id">;

class Device
  extends Model<DeviceAttributes, DeviceCreationAttributes>
  implements DeviceAttributes
{
  public id!: number;
  public device_name!: string;
  public device_type_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    this.belongsTo(DeviceType, { foreignKey: "id" });
  }
}

Device.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    device_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    device_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: DeviceType,
        key: "id",
      },
    },
  },
  { sequelize: sequelize, tableName: "devices", modelName: "Device" }
);

export default Device;
