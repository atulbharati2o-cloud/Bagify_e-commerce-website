const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/dbconnection.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const ownersRouter = require('./routes/ownersRouter.js');

// Connect to the database
connectDB();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})