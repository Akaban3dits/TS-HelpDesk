import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";
import { Status } from "../enum/status";

interface StatusHistoryAttributes {
  id: number;
  changed_at?: Date;
  old_status: Status;
  new_status: Status;
  ticket_id: string;
  changed_by_user_id: string;
}

type StatusHistoryCreationAttributes = Optional<
  StatusHistoryAttributes,
  "id" | "changed_at"
>;

class StatusHistory
  extends Model<StatusHistoryAttributes, StatusHistoryCreationAttributes>
  implements StatusHistoryAttributes
{
  public id!: number;
  public changed_at?: Date;
  public old_status!: Status;
  public new_status!: Status;
  public ticket_id!: string;
  public changed_by_user_id!: string;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    this.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "friendly_code",
    });

    this.belongsTo(models.User, {
      foreignKey: "changed_by_user_id",
      targetKey: "friendly_code",
    });
  }
}

StatusHistory.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    changed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    old_status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
    },
    new_status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
    },
    ticket_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    changed_by_user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "StatusHistory",
    tableName: "status_history",
    timestamps: false,
  }
);

export default StatusHistory;
