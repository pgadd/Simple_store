import mongoose from 'mongoose';

// Function to connect to MongoDB
export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI); //the code that actually connects to the database
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // code 1 means failure and 0 means success
    }
}