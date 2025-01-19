import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Ticket from "./ticket.model";

interface AttachmentAttributes {
  id: number;
  file_path: string;
  original_filename: string;
  uploaded_at?: Date;
  ticket_id: string;
  is_image: boolean;
}

type AttachmentCreationAttributes = Optional<
  AttachmentAttributes,
  "id" | "uploaded_at"
>;

class Attachment
  extends Model<AttachmentAttributes, AttachmentCreationAttributes>
  implements AttachmentAttributes
{
  public id!: number;
  public file_path!: string;
  public original_filename!: string;
  public uploaded_at?: Date;
  public ticket_id!: string;
  public is_image!: boolean;

  public static associate() {
    this.belongsTo(Ticket, { foreignKey: "ticket_id", onDelete: "CASCADE" });
  }
}

Attachment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    file_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    original_filename: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
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
    is_image: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Attatchment",
    tableName: "attachments",
    timestamps: false,
  }
);

export default Attachment;
