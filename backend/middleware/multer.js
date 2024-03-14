import multer from "multer";
import path from "path";

import { v4 as uuidv4 } from "uuid";
// Define the directory where the uploaded files will be stored

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});
export const upload = multer({ storage: storage });
