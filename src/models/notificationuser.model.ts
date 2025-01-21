import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";
import Notification from "./notification.model";
import User from "./user.model";

interface NotificationUserAttributes {
  notification_id: number;
  user_id: string;
  read_at?: Date | null;
  hidden?: boolean;
}

type NotificationUserCreationAttributes = Optional<
  NotificationUserAttributes,
  "read_at" | "hidden"
>;

class NotificationUser
  extends Model<NotificationUserAttributes, NotificationUserCreationAttributes>
  implements NotificationUserAttributes
{
  public notification_id!: number;
  public user_id!: string;
  public read_at?: Date | null;
  public hidden?: boolean;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    this.belongsTo(models.Notification, { foreignKey: "notification_id", onDelete: "CASCADE" });
    this.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE" });
  }
}

NotificationUser.init(
  {
    notification_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      references: {
        model: Notification,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      references: {
        model: User,
        key: "friendly_code",
      },
      onDelete: "CASCADE",
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "NotificationUser",
    tableName: "notification_user",  
    timestamps: false,
  }
);

export default NotificationUser;
