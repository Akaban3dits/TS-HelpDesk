import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

interface TicketAttributes {
  friendly_code: string;
  title: string;
  description: string;
  closed_at?: Date | null;
  status_id: number;
  priority_id?: number | null;
  device_id?: number | null;
  assigned_user_id?: string | null;
  department_id?: number | null;
  parent_ticket_id?: string | null;
  created_By?: string | null;
  created_By_name?: string | null;
  updated_By?: string | null;
}

type TicketCreationAttributes = Optional<
  TicketAttributes,
  | "friendly_code"
  | "closed_at"
  | "priority_id"
  | "device_id"
  | "assigned_user_id"
  | "department_id"
  | "parent_ticket_id"
  | "created_By"
  | "created_By_name"
  | "updated_By"
>;

class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public friendly_code!: string;
  public title!: string;
  public description!: string;
  public closed_at?: Date | null;
  public status_id!: number;
  public priority_id?: number | null;
  public device_id?: number | null;
  public assigned_user_id?: string | null;
  public department_id?: number | null;
  public parent_ticket_id?: string | null;
  public created_By?: string | null;
  public created_By_name?: string | null;
  public updated_By?: string | null;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    this.belongsTo(models.Status, {
      foreignKey: "status_id",
      targetKey: "id", 
    });
    this.belongsTo(models.Priority, {
      foreignKey: "priority_id",
      targetKey: "id", 
    });
    this.belongsTo(models.Device, {
      foreignKey: "device_id",
      targetKey: "id", 
    });
    this.belongsTo(models.User, {
      foreignKey: "assigned_user_id",
      targetKey: "friendly_code", 
      onDelete: "SET NULL",
    });
    this.belongsTo(models.Department, {
      foreignKey: "department_id",
      targetKey: "id", 
      onDelete: "SET NULL",
    });
    this.belongsTo(models.Ticket, {
      foreignKey: "parent_ticket_id",
      targetKey: "friendly_code",
      onDelete: "SET NULL",
    });
    this.belongsTo(models.User, {
      foreignKey: "created_By",
      targetKey: "friendly_code", 
      onDelete: "SET NULL",
    });
    this.belongsTo(models.User, {
      foreignKey: "updated_By",
      targetKey: "friendly_code",
      onDelete: "SET NULL",
    });
  }
}

Ticket.init(
  {
    friendly_code: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    closed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    priority_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    device_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    assigned_user_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    department_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    parent_ticket_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    created_By: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_By_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    updated_By: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "ticket",
    modelName: "Ticket",
    timestamps: true, 
  }
);

export default Ticket;
