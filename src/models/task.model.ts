import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

interface NotificationUserAttributes {
  id: number;
  notification_id: number;
  user_id: string;
  read_at?: Date | null;
  hidden?: boolean;
  created_at?: Date;
}

type NotificationUserCreationAttributes = Optional<
  NotificationUserAttributes,
  "id" | "read_at" | "hidden" | "created_at"
>;

class NotificationUser
  extends Model<NotificationUserAttributes, NotificationUserCreationAttributes>
  implements NotificationUserAttributes
{
  public id!: number;
  public notification_id!: number;
  public user_id!: string;
  public read_at?: Date | null;
  public hidden?: boolean;
  public created_at?: Date;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    this.belongsTo(models.Notification, { foreignKey: "notification_id", targetKey: "id", onDelete: "CASCADE" });
    this.belongsTo(models.User, { foreignKey: "user_id", targetKey: "friendly_code", onDelete: "CASCADE" });
  }
}

NotificationUser.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    notification_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelize,
    tableName: "notification_user",
    timestamps: false,
    modelName: "NotificationUser",
  }
);

export default NotificationUser;
