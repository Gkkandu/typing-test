const mongoose =require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const EmployeeModel = mongoose.model("users",EmployeeSchema)
module.exports= EmployeeModel;
