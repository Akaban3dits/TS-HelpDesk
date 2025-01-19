import { DataTypes, Model, Optional } from "sequelize";
import Ticket from "./ticket.model";
import sequelize from "../config/database";

interface TaskAttributes {
  id: number;
  task_description: string;
  is_completed: boolean;
  ticket_id: string;
  created_at?: Date;
}

type TaskCreationAttributes = Optional<TaskAttributes, "id" | "created_at">;

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public task_description!: string;
  public is_completed!: boolean;
  public ticket_id!: string;
  public created_at?: Date;

  public static associate() {
    this.belongsTo(Ticket, { foreignKey: "ticket_id" });
  }
}

Task.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    task_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    ticket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: Ticket,
        key: "friendly_code",
      },
      onDelete: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: false,
    modelName: "Task"
  }
);

export default Task;
