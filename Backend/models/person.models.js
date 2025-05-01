import mongoose from "mongoose";

// defining the schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// creating the model
const Person = mongoose.model('Person', personSchema);

export default Person;
