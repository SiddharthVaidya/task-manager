const express = require("express");
const app = express();
const fs = require("fs");
const Validator = require('./helper/validator')
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let data = fs.readFileSync("./task.json", { encoding: "utf8" });
data = JSON.parse(data);

// Get all tasks
app.get("/tasks", (req, res) => {
  res.status(200).send(data.tasks);
});

// Get task by taskId
app.get("/tasks/:id", (req, res) => {
  
  let taskIndex = data.tasks.findIndex((task) => task.id == req.params.id);
  if (taskIndex == -1) {
    return res.status(404).json({
      message: "Task not found with given ID",
    });
  }
  res.status(200).json(data.tasks[taskIndex]);
});

// POST a new Task
app.post("/tasks", (req, res) =>{
    if(!Validator.validatePostRequest(req.body)){
        return res.status(400).json({"message": "Invalid request"})
    }
    let taskId = Math.max.apply(null, data.tasks.map((task) => task.id))
    req.body.id = taskId+1
    data.tasks.push(req.body)
    res.status(201).json({"message": "Task successfully added"})
})

// Update existing task
app.put("/tasks/:id", (req, res)=>{
    
    let taskIndex = data.tasks.findIndex((task)=> task.id == req.params.id)
    if(taskIndex === -1){
        return res.status(404).json({"message": "Task not found"})
    }
    let updatedTask = req.body
    if(!Validator.validatePutRequest(req.body)){
        return res.status(400).json({"message": "Invalid request"})
    }
    data.tasks[taskIndex] = {...data.tasks[taskIndex], ...updatedTask}
    res.status(200).json({"message": "Task successfully updated"})
})

// Delete a task
app.delete("/tasks/:id", (req, res)=>{
    let taskIndex = data.tasks.findIndex((task) => task.id == req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    data.tasks.splice(taskIndex, 1)
    res.status(200).json({"message": "Task successfully deleted"})
})

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});



module.exports = app;