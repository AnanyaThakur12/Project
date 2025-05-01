import express from 'express'
import Person from '../../models/person.models.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body

    // create a new person document in our model
    const newPerson = new Person(data);

    // save the newPerson to the database
    try {
        const savedPerson = await newPerson.save();
        console.log("data saved successfully!!");
        console.log(newPerson)
        res.status(200).json(savedPerson);
    } catch (error) {
        console.log("Error saving response!!", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ err: 'Invalid Work Type' })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })


        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('data updated!!')
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({ error: "Person not found" })
        }
        console.log("Data deleted!");
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "Internal Server Error" })
    }
})
export default router;