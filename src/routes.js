const express = require("express");
const userController = require("./controller/userController");
const sessionController = require("./controller/sessionController");
const auth = require("./middleware/auth");
const imobiController = require("./controller/imobiController");

const multer = require("multer");
const uploadConfig = require("../src/middleware/upload");
const messageController = require("./controller/messageController");

const upload = multer(uploadConfig);

const router = express.Router();

router.post("/createusers", userController.createUser);
router.post("/session", sessionController.createSession);
router.get("/users", auth, userController.findUsers);
router.get("/listimobi", imobiController.findAllImobi);
router.get("/listimobi/:slug", imobiController.findImobi);
router.get("/listmobi/:id", imobiController.findAllId);
router.post(
  "/createimobi",
  upload.single("thumb"),
  imobiController.createImobi
);
router.post("/createmessage", messageController.createMessage);
router.get("/findmessage/:id", messageController.findMenssage)

module.exports = { router };
