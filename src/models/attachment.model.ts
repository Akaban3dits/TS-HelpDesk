import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../config/database";

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

  public static associate(models: { [key: string]: ModelStatic<Model> }): void {
    Attachment.belongsTo(models.Ticket, {
      foreignKey: "ticket_id",
      targetKey: "friendly_code",
      onDelete: "CASCADE",
    });
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
    },
    is_image: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Attachment",
    tableName: "attachments",
    timestamps: false,
  }
);

export default Attachment;
