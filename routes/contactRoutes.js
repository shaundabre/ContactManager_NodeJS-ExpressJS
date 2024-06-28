const express = require("express");
const router = express.Router(); // Correctly initialize the router

const {getContact, 
    createContact, 
    getContactForID, 
    postUpdate, 
    deleteContact}= require('../controllers/contactControllers');    
    
const validateToken = require("../middleware/validateTokenHandler");



router.use(validateToken);

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get(getContactForID);

router.route("/:id").put(postUpdate);

router.route("/:id").delete(deleteContact);


module.exports = router; // Export the router
