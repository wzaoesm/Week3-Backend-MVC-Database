// router/router.js

const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");
const groupController = require("../controller/groupController");
const contactGroupController = require("../controller/contactGroupController");

router
  .route("/contact")
  .get(contactController.getContacts)
  .post(contactController.createContact);

router.put("/contact/:id", contactController.updateContact);
router.delete("/contact/:id", contactController.deleteContact);

router
  .route("/groups")
  .get(groupController.getGroups)
  .post(groupController.createGroups);
router.put("/groups/:id", groupController.updateGroups);
router.delete("/groups/:id", groupController.deleteGroups);

router.post("/contactGroup", contactGroupController.createContactGroup);
router.put("/contactGroup/:id", contactGroupController.updateContactGroup);
router.delete("/contactGroup/:id", contactGroupController.deleteContactGroup);

module.exports = router;