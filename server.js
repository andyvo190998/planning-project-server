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
require('dotenv').config();

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
const Tabs = mongoose.model('Tabs', itemsSchema);



//get request to get tasks from mongoDB database
app.get('/', (req,res) => {
    Tabs.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: "+ err))
});

//find specific task
app.get("/task/:id", (req,res) => {
    const id = req.params.id;
    Tabs.find({_id: id})
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: "+ err))
})


//add new task
app.post('/newtask', (req, res) => {
    const newItem = new Tabs(
        {
            taskName: req.body.taskName,
            taskDecription: req.body.taskDecription,
            completed: false
        }
    );
    newItem.save()
    .then(item => console.log(item))
    .catch(err => res.status(400).json("Error "+err))
})

// update task status to completed
app.put('/update/:id', (req,res) => {
    const updatedItem = {completed: true}
    Tabs.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updatedItem},
        (req, res) => {
        console.log('item updated')
    })
})

// update task information
app.put("/taskupdate/:id", (req,res) => {
    const updatedItem = {
        taskName: req.body.taskName,
        taskDecription: req.body.taskDecription
    }
    console.log(updatedItem)

    Tabs.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updatedItem},
        (req,res) => {
        console.log("Item updated")
    })
})

// delete task
app.delete("/delete/:id", (req,res) => {
    const deleteId = req.params.id;
    Tabs.findByIdAndRemove(deleteId, (req,res) => {
        console.log('deleted')
    })
})



app.listen(port, function () {
    console.log(`server is running on port ${port}`)
})