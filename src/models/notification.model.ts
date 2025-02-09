import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";
import { NotificationType } from "../enum/notificationType";
interface NotificationAttributes {
  id: number;
  ticket_id?: string;
  message: string;
  type: NotificationType;
  created_at?: Date;
}

type NotificationCreationAttributes = Optional<
  NotificationAttributes,
  "id" | "ticket_id" | "created_at"
>;

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public ticket_id?: string;
  public message!: string;
  public type!: NotificationType;
  public created_at?: Date;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    Notification.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "friendly_code",
      onDelete: "CASCADE",
    });

    Notification.hasMany(models.NotificationUser, {
      foreignKey: "notification_id",
      as: "notificationUsers",
      onDelete: "CASCADE",
    });
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    ticket_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(NotificationType)),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelize,
    tableName: "notifications",
    modelName: "Notification",
    timestamps: false,
  }
);

export default Notification;
