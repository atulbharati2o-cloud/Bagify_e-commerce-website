const mongoose = require('mongoose');
const debug = require("debug")("app:db"); 

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        debug(`MongoDB Connected ✅: ${connectionInstance.connection.host}`);
    } catch (error) {
        debug("MongoDB connection FAILED ❌", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;