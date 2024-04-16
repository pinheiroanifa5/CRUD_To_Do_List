const express=require("express")
const app= express()
const bodyParser = require("body-parser")
const port=4000;


app.use(bodyParser.json())

let ToDos=[];


app.listen(port,()=>{
    console.log("App listening in Port:",port);
});
//Get,POST,PUT,DELETE
app.get("/todos", (req,res)=>{
    const {name:searchedName} = req.query    
    if (searchedName) {
        const todo = ToDos.find((todo) => todo.name.toLowerCase() === searchedName.toLowerCase())
        return res.status(200).json(todo)
    } 

    res.json(ToDos);

});

app.post("/todo", (req,res) => {
    const todo = req.body

    if (!todo) {
        return res.status(400).json("Todo cannot be empty")
    }
 
   ToDos.push(todo) 
   //ToDos = [...ToDos, todo] //copia array existente + novo element
     res.status(201).json({message:"Sucessfully created",todo})

})

app.put("/todo/:id", (req,res) => {

    const id = req.params.id
    const updatedTodoData = req.body

    const foundedTodo = ToDos.find((todo) => todo.id === Number(id))

    if (!foundedTodo) {
        return res.status(404).json("Todo not found!")
    }

   ToDos = ToDos.map((todo) => {
    return todo.id === foundedTodo.id ? updatedTodoData : todo
   })
    return res.status(200).json({message:"Sucessfully Deleted",updatedTodo:foundedTodo})
   
})

app.delete("/todo/:id", (req,res) => {
    const id = req.params.id

    const foundTodo = ToDos.find((todo) => todo.id === Number(id))

    if (!foundTodo) {
        return res.status(404).json("Todo not found!")
    }

   ToDos = ToDos.filter((todo) => todo.id !== foundTodo.id)
    return res.status(200).json({message:"Sucessfully Deleted", ToDos})

})