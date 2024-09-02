const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const port=3005
const db=require("./db")
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req,res) => {
  db.all("SELECT * FROM todo", [],(err,rows)=>{
    if(err){
      throw err
    }
    res.json(rows);
  })
  
})

app.post('/',(req,res) => {
  const {taskName,description,date}=req.body;
  console.log(req.body)
  db.run(
    "INSERT INTO todo (taskName,description,date) VALUES (?,?,?)",
    [taskName,description,date],
    function(err){
      if(err){
        console.log(err)
      }
      console.log(req.body)
      res.json({id: this.lastID,taskName,description,date})
    }
  )
  
  
  


})

app.delete('/:id',(req,res)=>{
  db.run(`DELETE FROM todo WHERE id=?`,req.params.id,function(err){
    if(err){
      return console.error(err.message)
    }
    res.send("Deleted")
  })
})

app.listen(port,() => {
  console.log(`Server is listeing on port ${port} `)
})