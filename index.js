// const express = require("express")
// const mongoose = require("mongoose")
// const EmployeeModel = require("./models/Employee")
// const cors = require("cors")

// const app = express()
// app.use(express.json())
// app.use(cors())

// mongoose.connect("mongodb://127.0.0.1:27017/employee");
// app.post ("/login",(req,res)=>{
//     const { email,password} = req.body;
//     EmployeeModel.findOne({email:email})
//     .then(user=>{
//         if(user){
//             if(user.password === password){
//                 res.json("Success")
//             } else {
//                 res.json("the password is incorrect")
//             }
//         } else{
//             res.json("No record existed")
//         }
//     })
// })

// app.post('/',(req,res)=>{
//    EmployeeModel.create(req.body)
//    .then(employees=>res.json(employees ))
//    .catch(err => res.json(err))
// })
// app.listen(3001,()=>{
//     console.log("server is running")
// })
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./models/Employee");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://gk24014:Neeraj@cluster0.4vkgn.mongodb.net/react?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // Check if the password is correct
        if (user.password === password) {
          res.json({
            status: "Success",
            user: {
              email: user.email,
              username: user.username
            }
          });
        } else {
          // Incorrect password
          res.json({
            status: "Error",
            message: "Invalid credentials"
          });
        }
      } else {
        // User not found
        res.json({
          status: "Error",
          message: "No record existed"
        });
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      res.json({
        status: "Error",
        message: "An error occurred during login"
      });
    });
});


app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if user already exists
    EmployeeModel.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.json({ status: 'Error', message: 'User already exists' });
        }
  
        // Create new user
        EmployeeModel.create({ username, email, password })
          .then(user => res.json({ status: 'Success', user }))
          .catch(err => {
            console.error('Error creating user:', err);
            res.status(500).json({ status: 'Error', message: 'Error creating user' });
          });
      })
      .catch(err => {
        console.error('Error checking user existence:', err);
        res.status(500).json({ status: 'Error', message: 'Error checking user existence' });
      });
  });
app.get('/users', (req, res) => {
    EmployeeModel.find()
      .then(users => res.json(users))
      .catch(err => {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users' });
      });
  });
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    EmployeeModel.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error deleting user' });
      });
  });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
