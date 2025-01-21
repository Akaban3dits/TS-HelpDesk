import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

// Interfaces
interface CommentAttributes {
  id: number;
  comment_text: string;
  ticket_id: string;
  user_id: string;
  parent_comment_id?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type CommentCreationAttributes = Optional<
  CommentAttributes,
  "id" | "parent_comment_id" | "createdAt" | "updatedAt"
>;

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public comment_text!: string;
  public ticket_id!: string;
  public user_id!: string;
  public parent_comment_id?: number | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    Comment.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "friendly_code",
      onDelete: "CASCADE"
    });
    
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "friendly_code",
      onDelete: "CASCADE"
    });
    
    Comment.belongsTo(Comment, {
      foreignKey: "parent_comment_id",
      as: "parent_comment"
    });
    
    Comment.hasMany(Comment, {
      foreignKey: "parent_comment_id",
      as: "replies"
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ticket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent_comment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    }
  },
  {
    sequelize: sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true
  }
);

export default Comment;