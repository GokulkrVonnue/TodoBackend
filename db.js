const sqlite=require('sqlite3').verbose()
const db=new sqlite.Database('./database.db')

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, taskName TEXT, description TEXT, date Text)")
});
db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS filterdata (id INTEGER PRIMARY KEY AUTOINCREMENT, filterName TEXT, filterquery TEXT)")
});
db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS labeldata (id INTEGER PRIMARY KEY AUTOINCREMENT, LabelName TEXT)")
});

module.exports=db;