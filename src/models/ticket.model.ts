import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../config/database";
import Status from "./status.model";
import Priority from "./priority.model";
import Device from "./device.model";
import Department from "./department.model";
import User from "./user.model";

interface TicketAttributes {
  friendly_code: string;
  title: string;
  description: string;
  closed_at?: Date | null;
  status_id: number;
  priority_id?: number | null;
  device_id?: number | null;
  assigned_user_id?: number | null;
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
  public assigned_user_id?: number | null;
  public department_id?: number | null;
  public parent_ticket_id?: string | null;
  public created_By?: string | null;
  public created_By_name?: string | null;
  public updated_By?: string | null;

  public static associate() {
    this.belongsTo(Status, { foreignKey: "status_id" });
    this.belongsTo(Priority, { foreignKey: "priority_id" });
    this.belongsTo(Device, { foreignKey: "device_id" });
    this.belongsTo(User, {
      foreignKey: "assigned_user_id",
      onDelete: "SET NULL",
    });
    this.belongsTo(Department, {
      foreignKey: "department_id",
      onDelete: "SET NULL",
    });
    this.belongsTo(Ticket, {
      foreignKey: "parent_ticket_id",
      onDelete: "SET NULL",
    });
    this.belongsTo(User, {
      foreignKey: "created_By",
      onDelete: "SET NULL",
    });
    this.belongsTo(User, {
      foreignKey: "updated_By",
      onDelete: "SET NULL",
    });
  }
}

Ticket.init(
  {
    friendly_code: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Status,
        key: "id",
      },
    },
    priority_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: Priority,
        key: "id",
      },
    },
    device_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: Device,
        key: "id",
      },
    },
    assigned_user_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    department_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: Department,
        key: "id",
      },
    },
    parent_ticket_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: Ticket,
        key: "friendly_code",
      },
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
      references: {
        model: User,
        key: "friendly_code",
      },
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    tableName: "ticket",
    modelName: "Ticket",
  }
);

export default Ticket;
