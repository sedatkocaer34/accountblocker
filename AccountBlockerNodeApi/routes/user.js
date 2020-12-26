const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenMiddleware = require('../middleware/tokenVerify');

router.post('/register',  (req, res, next) => {
    
  const user = new User(req.body);
  // hashing User Password
  const emailPromise =  User.findOne({ email: user.email });
  
     emailPromise.then((result)=>{
      if(result)
      {
        res.status(401).json({error:{message:"E-Mail Alredy exists"}});
      }
      else
      {
        user.password =  bcrypt.hashSync(user.password, 8);
        const userPromise = user.save();
        
        userPromise.then((data)=>{
          res.status(201).json({
            message:"User created.",
            status:true
           })
          }).catch((err)=>{
            res.json(err);
        });
      }
  }).catch((err)=>{
    res.json(err);
  });
});


router.post('/login', async (req, res, next) => {
    
  const {email , password} = req.body;
  
  const userEmailPromise = User.findOne({email});
  userEmailPromise.then((data)=>{
    if(data)
    {
      if(bcrypt.compareSync(password,data.password))
      {
        const payload = { email };
        const token = jwt.sign(payload,process.env.API_SECRET_KEY,{
            expiresIn:720
        });

        const user = {userId:data.userId,
          name:data.name,
          email:data.email};

        res.status(201).json({
          data:user,
          token:token,
          status:true,
         });
      }
      else
      {
        res.status(401).json({error:{message:"Password not true."}});
      }
    }
    else
    {
      res.status(401).json({error:{message:"E-Mail or password wrong."}});
    }
    }).catch((err)=>{
      res.json(err);
    });
});


// get email and password req.body before give the token and refresh token
router.get('/getUser/:user_id',tokenMiddleware, (req, res, next) => {
    
  const user_id = req.params.user_id;
  const userPromise = User.findById(user_id);
  userPromise.then((data)=>{
    const resUser = {
      name:data.name,
      surname:data.surname,
      email:data.email,
    }
      res.json(resUser);
    }).catch((err)=>{
      res.json(err);
    });
});


// get email and password req.body before give the token and refresh token
router.get('/getUserList',tokenMiddleware, (req, res, next) => {
  const userList =[];  
  const userPromise = User.find({});

  userPromise.then((data)=>{
    data.forEach(data =>{
      userList.push({name:data.name,surname:data.surname,email:data.email});
    });
      res.status(200).json({
        status:true,
        message:"User Listed.",
        data:userList});

    }).catch((err)=>{
      res.json({error:{message:"something went wrong."}});
    });
});


module.exports=router; 
