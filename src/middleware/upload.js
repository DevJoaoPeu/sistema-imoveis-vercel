const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const tempFolder = path.resolve(__dirname, "../", "../", "uploads");
const tempUpload = path.resolve(tempFolder, "uploads");
module.exports = {
  directory: tempFolder,
  uploadFolder: tempUpload,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(req, file, cb) {
      const hashFile = crypto.randomBytes(10).toString("hex");
      const nameFile = `${hashFile}-${file.originalname}`;

      return cb(null, nameFile);
    },
  }),
};
