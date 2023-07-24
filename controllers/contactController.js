const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//Get All Contact
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//Create Contact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "Contact Details Are Missing" });
  } else {
    console.log("here");
    console.log(req.body);
    const contact = await Contact.create({
      name,
      email,
      phone,
    });

    res.status(200).json(contact);
  }
});
//Update Contact by ID
const updateContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact Not Found" });
    } else {
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(404).json({ message: "Internal Server Error" });
  }
});

//Delete Contact by ID
const DeleteContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact Not Found" });
    } else {
      await contact.deleteOne();
      res.status(200).json({ message: "Contact Removed", contact });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(404).json({ message: "Internal Server Error" });
  }
});

//Get Single Contact
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact Not Found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(404).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  DeleteContact,
  getContact,
};
