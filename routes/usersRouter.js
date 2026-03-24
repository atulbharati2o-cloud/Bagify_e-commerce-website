const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController.js');
const upload = require('../config/multerConfig.js');


router.get("/", (req, res) => {
    res.send("Users route is working!");
});

router.post("/register", upload.single('profilepic'),  registerUser);

router.post("/login", loginUser);

router.get('/logout', logoutUser);

module.exports = router;