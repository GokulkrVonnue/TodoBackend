const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const port=3005
const db=require("./db")
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.get('/todo', (req,res) => {
  db.all("SELECT * FROM todo", [],(err,rows)=>{
    if(err){
      throw err
    }
    res.json(rows);
    
  })
  
})
app.get('/filter',(req,res) => {
  db.all("SELECT * FROM filterdata", [],(err,rows)=>{
    if(err){
      throw err
    }
    res.json(rows);
    
  })
});
app.get('/filter/:id',(req,res) => {
  db.all(`SELECT * FROM filterdata WHERE id=?`, [req.params.id],(err,rows)=>{
    if(err){
      throw err 
    }
    res.json(rows);
  })                                                  
});
app.post('/filter',(req,res) => {
  const {filterName,queryName}=req.body;
  console.log(req.body)
  db.run(
    "INSERT INTO filterdata (filterName,filterquery) VALUES (?,?)",
    [filterName,queryName],
    function(err){
      if(err){
        console.log(err)
      }
      console.log(req.body)
      res.json({id: this.lastID,filterName,queryName})
    }
  )
});
app.delete('/filter/:id',(req,res)=>{
  db.run(`DELETE FROM filterdata WHERE id=?`,req.params.id,function(err){
    if(err){
      return console.error(err.message)
    }
    res.send("Deleted")
  })
})
app.get('/todo/:id', (req,res) => {
  db.all(`SELECT * FROM todo WHERE id=?`, [req.params.id],(err,rows)=>{
    if(err){
      throw err
    }
    res.json(rows);
  })
  
})

// app.get('/filter',(req,res)=>{
//   console.log(req.body)
//   res.send("hi")

// })

app.post('/todo',(req,res) => {
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

app.delete('/todo/:id',(req,res)=>{
  db.run(`DELETE FROM todo WHERE id=?`,req.params.id,function(err){
    if(err){
      return console.error(err.message)
    }
    res.send("Deleted")
  })
})
app.put('/todo/:id',(req,res)=>{

  const { taskName, description, date } = req.body
  const params=[taskName,description,date,req.params.id]
  db.run(`UPDATE todo SET taskName = ?, description = ?, date = ? WHERE id = ?`,params,function(err){
    if(err){
      console.log(err)
    }
    console.log(req.body)
    res.json({id: this.lastID,taskName,description,date})
  });
  
})
app.get("/labels",(req,res)=>{
  db.all(`SELECT * FROM labeldata WHERE id=?`, [req.params.id],(err,rows)=>{
    if(err){
      throw err
    }
    res.json(rows);
  })

})

app.post('/labels',(req,res) => {
  const {LabelName}=req.body;
  console.log(req.body)
  db.run(
    "INSERT INTO labeldata (LabelName) VALUES (?)",
    [LabelName],
    function(err){
      if(err){
        console.log(err)
      }
      console.log(req.body)
      res.json({id: this.lastID,LabelName})
    }
  )
});

app.listen(port,() => {
  console.log(`Server is listeing on port ${port} `)
})
            