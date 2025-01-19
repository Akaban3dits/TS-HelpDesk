import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Ticket from "./ticket.model";

interface NotificationAttributes {
  id: number;
  ticket_id?: string;
  message: string;
  type: "Nuevo Ticket" | "Actualización" | "Asignación";
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
  public type!: "Nuevo Ticket" | "Actualización" | "Asignación";
  public created_at?: Date;

  public static associate() {
    this.belongsTo(Ticket, { foreignKey: "ticket_id", onDelete: "CASCADE" });
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
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: Ticket,
        key: "friendly_code",
      },
      onDelete: "CASCADE",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Nuevo Ticket", "Actualización", "Asignación"),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: false,
    modelName: "Notification"
  }
);

export default Notification;
