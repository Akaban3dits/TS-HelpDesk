import { DataTypes, Model, ModelStatic, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

interface TaskAttributes {
  id: number;
  task_description: string;
  is_completed: boolean;
  ticket_id: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

type TaskCreationAttribute = Optional<TaskAttributes, "id" | "is_completed">;

class Task
  extends Model<TaskAttributes, TaskCreationAttribute>
  implements TaskAttributes
{
  public id!: number;
  public task_description!: string;
  public is_completed!: boolean;
  public ticket_id!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

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
      defaultValue: false,  
    },
    ticket_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    modelName: "Task",
    timestamps: true,  
  }
);

export default Task;
