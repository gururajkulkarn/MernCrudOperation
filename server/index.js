const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require("./models/Users")
const RegisterModel = require("./models/NewUser")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://gururajk:guru123@cluster0.4uu67a5.mongodb.net/merncrud');


const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

db.once('open', () => {
    console.log('Database connected');
});

app.get('/', (req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// app.get('/register', (req,res)=>{
//     RegisterModel.find({})
//     .then(registers => res.json(registers))
//     .catch(err =>  res.json(err))
// })

app.get('/getUser/:id',(req,res)=>{
    const id =req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createRegister", (req,res) => {
    RegisterModel.create(req.body)
    .then(registers => res.json(registers))
    .catch(err => res.json(err))
})

// Application Form POST METHODE

app.post("/application", (req,res) => {
    ApplModel.create(req.body)
    .then(forms => res.json(forms))
    .catch(err => res.json(err))
})

app.get('/list', (req,res)=>{
    ApplModel.find({})
    .then(forms => res.json(forms))
    .catch(err => res.json(err))
})

app.get('/getcandidate/:id',(req,res)=>{
    const id =req.params.id;
    ApplModel.findById({_id:id})
    .then(forms => res.json(forms))
    .catch(err => res.json(err))
})

app.put("/updatecandidate/:id", (req,res)=>{
    const id = req.params.id;
    ApplModel.findByIdAndUpdate({_id:id},{
        fname:req.body.fname,
        lname:req.body.lname,
        mobile:req.body.mobile,
        email:req.body.email,
        dob:req.body.dob,
        education:req.body.education,
        state:req.body.state,
        city:req.body.city
    })
    .then(forms => res.json(forms))
    .catch(err => res.json(err))
})

app.delete("/deleteCandate/:id",(req,res) => {
    const id = req.params.id;
    ApplModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})







app.post("/login", (req,res) => {
    const {email,password} = req.body;
    RegisterModel.findOne({email:email})
    .then(user => {
        if(user){
        if(user.password === password){
            res.json("Success")
        } else{
            res.json("the password is incorrect")
        }
    }
        else  {
            res.json("no records found")
        }
    })
})



app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
 .catch(err => res.json(err))
})


app.put("/updateUser/:id", (req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        fname:req.body.fname,
        lname:req.body.lname,
        mobile:req.body.mobile,
        email:req.body.email,
        dob:req.body.dob,
        education:req.body.education,
        state:req.body.state,
        city:req.body.city
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.delete("/deleteUser/:id",(req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.listen(3001, () =>{
    console.log("Server is Running")
})