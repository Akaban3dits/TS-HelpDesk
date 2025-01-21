import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import Ticket from "./ticket.model";
import { sequelize } from "../config/database";

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

  // Método de asociación con Ticket
  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    this.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "friendly_code", 
    });
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelize,
    tableName: "tasks",
    timestamps: false, 
    modelName: "Task",
  }
);

export default Task;
