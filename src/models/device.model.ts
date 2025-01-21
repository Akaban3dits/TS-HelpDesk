import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

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

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    Device.belongsTo(models.DeviceType, {
      foreignKey: "device_type_id",
      as: "deviceType"
    });

    Device.hasMany(models.Ticket, {
      foreignKey: "device_id",
      as: "tickets"
    });
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
    },
  },
  {
    sequelize: sequelize,
    tableName: "devices",
    modelName: "Device",
    timestamps: false
  }
);

export default Device;