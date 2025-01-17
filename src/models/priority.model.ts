import { DataTypes, Optional, Model } from "sequelize";
import sequelize from "../config/database";

interface PriorityAttributes {
  id: number;
  priority_name: string;
}

type PriorityCreationAttributes = Optional<PriorityAttributes, "id">;

class Priority
  extends Model<PriorityAttributes, PriorityCreationAttributes>
  implements PriorityAttributes
{
  public id!: number;
  public priority_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Priority.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    priority_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "priority",
    modelName: "Priority",
  }
);
