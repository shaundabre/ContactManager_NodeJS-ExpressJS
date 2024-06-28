const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler( async (req, res) => {  
    const contacts = await Contact.find({user_id: req.user.id}) ;
    res.status(200).json(contacts);
})

//@desc Create a Contact
//@route post /api/contacts
//@access private 
const createContact = asyncHandler(async (req, res) => {  
    console.log("Request body is " , req.body);
    const { name, email, phoneNo }= req.body;
    if(!name || !email || !phoneNo){
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const newContact = await Contact.create({
        name,
        email,
        phoneNo,
        user_id: req.user.id,
    });
    res.status(201).json(newContact);
})

//@desc GetForID 
//@route GET/:id /api/contacts
//@access private 
const getContactForID = asyncHandler( async (req, res) => {  
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Not Found");
    }
    res.status(200).json(contact);
})

//@desc Update Contacts for ID
//@route Post /api/contacts
//@access private 
const postUpdate = asyncHandler (async (req, res) => {  
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Not Found");
    }

    if(contact.use_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("Other users can't update or change other user contacts");
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new : true})
    res.status(200).json(updateContact);
})

//@desc Delete Contacts for ID
//@route Delete /api/contacts
//@access private 
const deleteContact = asyncHandler( async (req, res) => { 
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Not Found");
    } 

    

    if(contact.use_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("Other users can't update or change other user contacts");
    }

    await Contact.remove();
    res.status(200).json(contact);
})


module.exports={getContact, 
    createContact, 
    getContactForID, 
    postUpdate, 
    deleteContact};