const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContact,
  updateContact,
  DeleteContact,
  getContact,
} = require("../controllers/contactController");

router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").put(updateContact).delete(DeleteContact).get(getContact);

module.exports = router;
