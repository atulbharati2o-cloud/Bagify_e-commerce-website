const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owners.model.js");

//Allow owner creation ONLY in development
if(process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        try{
            // Check if an owner already exists(only one owner should be allowed in the system)
            let existingOwner = await ownerModel.findOne();

            if(existingOwner) {
                return res
                    .status(503)
                    .json({ message: "An owner already exists in the system." });
            }

            const { fullname, email, password } = req.body;
            const owner = await ownerModel.create({
                fullname,
                email,
                password
             });
            return res.status(201).json({ message: "Owner created successfully.", owner });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Error creating owner.", error: error.message });
        }
    });
};

router.get("/", (req, res) => {
    res.send("Owners route is working!");
});

module.exports = router;