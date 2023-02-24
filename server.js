const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3001;
require("dotenv").config();


app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Database setup
const apiKey = process.env.API_KEY;
mongoose.set("strictQuery", false);
mongoose.connect(apiKey)
    .then(() => console.log("Database connected"))
    const itemsSchema = {
        taskName: String,
        taskDecription: String,
        completed: Boolean
    }
const Tasks = mongoose.model('Tasks', itemsSchema);



//get request to get tasks from mongoDB database
app.get('/', (req,res) => {
    Tasks.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: "+ err))
});

//find specific task
app.get("/task/:id", (req,res) => {
    const id = req.params.id;
    Tasks.find({_id: id})
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: "+ err))
})


//add new task
app.post('/newtask', (req, res) => {
    const newItem = new Tasks(
        {
            taskName: req.body.taskName,
            taskDecription: req.body.taskDecription,
            completed: false
        }
    );
    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(400).json("Error "+err))
})

// update task status to completed
app.put('/update/:id', (req,res) => {
    const updatedItem = {completed: true}
    Tasks.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updatedItem}
    )
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: "+ err))
})

// update task information
app.put("/taskupdate/:id", (req,res) => {
    const updatedItem = {
        taskName: req.body.taskName,
        taskDecription: req.body.taskDecription
    }

    Tasks.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updatedItem}
    )
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: "+ err))
})

// delete task
app.delete("/delete/:id", (req,res) => {
    const deleteId = req.params.id;
    Tasks.findByIdAndRemove(deleteId)
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: "+ err))
})



app.listen(port, function () {
    console.log(`server is running on port ${port}`)
})