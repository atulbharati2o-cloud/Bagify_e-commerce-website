// Load environment variables from .env file
require("dotenv").config();

// Core modules and third-party libraries
const debug = require("debug")("app:server");
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

// Database connection
const connectDB = require('./config/dbconnection.js');
connectDB();

// Route imports
const index = require('./routes/index.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const ownersRouter = require('./routes/ownersRouter.js');


// App configuration (view engine, middleware, static files)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Route mounting
app.use("/", index)
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);


// Start the server
app.listen(process.env.PORT || 3000, () => {
    debug("Server is running on port " + (process.env.PORT || 3000));
})