import fs from "fs";
import multer, { StorageEngine } from "multer";
import path from "path";

const createDirectory = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
};

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const uploadDir = path.join(
      __dirname,
      "../uploads",
      year.toString(),
      month,
      day
    );
    createDirectory(uploadDir);

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const timestamp = `${year}${month}${day}`;
    const uniqueCode = `${timestamp}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    const fileExt = path.extname(file.originalname);

    const newFileName = `${uniqueCode}${fileExt}`;
    cb(null, newFileName);
  },
});

const uploadMiddleware = multer({ storage }).array("documents", 5);

export default uploadMiddleware;
