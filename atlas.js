const con_str = "mongodb+srv://mern:mern@cluster0.hgtaoyf.mongodb.net/practice?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");

mongoose.connect(con_str, {})
    .then(() => console.log("connected successfully.."))
    .catch((error) => console.log(error));

const express = require("express")
const app = express()
app.use(express.json());

const empSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String,
    city: String,
    profession: String,
    salary: Number

});
const emp = new mongoose.model("test1", empSchema);

var cors = require('cors');
app.use(cors())



app.get('/employees', async (req, res) => {
    let data = await emp.find();

    // var data = [{name:"harsh","salary":10000},{name:"Rajesh", "salary":2222}];
    res.send(data);
})


app.post('/employees', async (req, res) => {

    
    // For Hard coded 
    /* doc = {
    "name": "nay bhushari",
    "age": 27,
    "gender": "Female"
}

app.post('/test',async(req,res) =>{

    let add =  await emp(doc)
    let result =  add.save()
    res.send(doc)

})
  */

    doc = req.body;
    let add = await emp(doc);
    let result = add.save();
    res.send(doc);
})



//DELETE USING Node js
// Hard coded : "_id":"66f137788e2ac3ebc8b6de97"
app.delete('/employees', async (req, res) => {
    let d_data = await emp.deleteOne({ "_id": req.query['id'] });
    res.send(d_data);
})

//to fetch data for update 
app.get('/employees/:id',async(req,res) =>{

    console.log(req.params)
    let data = await emp.find({_id: req.params['id']});
     res.send(data[0]);
})


//For Update Data  
app.put('/employees',async(req,res) =>{


    let u_data = await emp.updateOne({"_id":req.body.id},{
        "$set":{
            "name" : req.body.name,
            "age"  : req.body.age

        }
    });

    res.send(u_data);

})


app.listen(8989, () => {
    console.log("running on port 8989......")
})