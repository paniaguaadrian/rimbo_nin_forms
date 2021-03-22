import express from "express";

// Controllers imported
import {
  sendRJ1FormEmailsEn,
  sendRJ2FormEmailsEn,
  sendRJ3FilesEmailEn,
  sendRJ11EmailsEn,
  sendPMEmailsEn,
  sendRJ3FormEmailEn,
  sendRJ15EmailsEn,
  sendRJSFormEmailEn,
  sendRJ18EmailEn,
} from "../controllers/emailsController.js";

const router = express.Router();

router.route("/rj1").post(sendRJ1FormEmailsEn);
router.route("/rj2/tt").post(sendRJ2FormEmailsEn);
router.route("/rj2/rimbo").post(sendRJ3FilesEmailEn);
router.route("/rj11").post(sendRJ11EmailsEn);
router.route("/rjpm").post(sendPMEmailsEn);
router.route("/rj3").post(sendRJ3FormEmailEn);
router.route("/rj15").post(sendRJ15EmailsEn);
router.route("/rjs").post(sendRJSFormEmailEn);
router.route("/rj18").post(sendRJ18EmailEn);

export default router;
