const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/bagify");
        console.log(`MongoDB Connected ✅: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection FAILED ❌", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;