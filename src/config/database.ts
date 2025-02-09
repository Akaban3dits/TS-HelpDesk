import { Model, ModelStatic } from "sequelize";
import { sequelize } from "./sequelize";
import Department from "../models/department.model";
import User from "../models/user.model";
import DeviceType from "../models/device-type.model";
import Device from "../models/device.model";
import Ticket from "../models/ticket.model";
import Comment from "../models/comment.model";
import Attachment from "../models/attachment.model";
import StatusHistory from "../models/statushistory.model";
import Task from "../models/task.model";
import Notification from "../models/notification.model";
import NotificationUser from "../models/notificationuser.model";

interface ModelWithAssociate extends ModelStatic<Model> {
  associate?: (models: { [key: string]: ModelStatic<Model> }) => void;
}

const models: ModelWithAssociate[] = [
  Department,
  DeviceType,
  User,
  Device,
  Ticket,
  Comment,
  Attachment,
  StatusHistory,
  Task,
  Notification,
  NotificationUser
];

models.forEach((model: ModelWithAssociate) => {
  if (typeof model.associate === 'function') {
    model.associate(sequelize.models);
  }
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
   
    await sequelize.sync({ alter: true });
    console.log('Models synchronized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { sequelize };