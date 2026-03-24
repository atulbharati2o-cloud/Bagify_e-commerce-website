const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController.js');


router.get("/", (req, res) => {
    res.send("Users route is working!");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;