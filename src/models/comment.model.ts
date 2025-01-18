import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Ticket from "./ticket.model";
import User from "./user.model";

interface CommentAttributes {
  id: number;
  comment_text: string;
  ticket_id: string;
  user_id: string;
  parent_comment_id?: number | null;
}

type CommentCreationAttributes = Optional<
  CommentAttributes,
  "id" | "parent_comment_id"
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

  public static associate() {
    this.belongsTo(Ticket, { foreignKey: "ticket_id" });
    this.belongsTo(User, { foreignKey: "user_id" });
    this.belongsTo(Comment, {
      foreignKey: "parent_commment_id",
      as: "parent_comment",
    });
    this.hasMany(Ticket, {
      foreignKey: "parent_comment_id",
      as: "replies",
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ticket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: Ticket,
        key: "friendly_code",
      },
    },
    user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: User,
        key: "friendly_code",
      },
    },
    parent_comment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: Comment,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "comments",
    modelName: "Comment",
    timestamps: true,
  }
);

export default Comment;
