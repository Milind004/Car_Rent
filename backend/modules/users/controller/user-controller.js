//user-controller.js

import { UserModel } from "../../../shared/db/models/user-schema.js";
import { hashing } from "../../../shared/encryption/encrypt.js";
import Redirect from 'react-router-dom';

export const userController={
    async register(request, response){
        const userInfo= request.body; //post data
        //console.log('Body is ', body);
        const existingUser = await UserModel.findOne({ email: userInfo.email }).exec();
        if (existingUser) {
            return response.json({ message: 'Email Already Exists'});
        }

        userInfo.password = hashing.passwordHash(userInfo.password);
        try{
            const doc= await UserModel.create(userInfo);
            if(doc ){
                response.json({message:'Registered Successfully'});
            }
            else{
                response.json({message:'Problem in Registering'});
            }
        } 
        catch(err){
            console.log('register err', err);
            response.json({message:'Problem in Register'});
        }
    },

   async login(request, response){
        const userInfo= request.body;
        const doc= await UserModel.findOne({'email':userInfo.email}).exec();
        console.log(doc);
        if(doc && doc._id){
            const plainPassword= userInfo.password;
            const dbPassword= doc.password;
            console.log(plainPassword+"    "+dbPassword);
            if(hashing.matchPassword(plainPassword, dbPassword)){
                response.json({message:'Welcome '+doc.name})  
            }
            else{
                response.json({message:'Invalid UserId or Password'})
            }
        }
        else{
            response.json({message:'Invalid Userid or Password'})
        }
        // if(userInfo.userid= userInfo.userpassword){
        //     response.json({message:'Welcome'+ userInfo.userid});
        // }
        // else{
        //     response.json({message:'Invalid Userid or Password'}); 
        // }
    },

    changePassword(request, response){
        response.json({message:'Change pwd'});
    },

    async profile(request, response) {
        const userInfo= request.body;
        try {
          const user = await UserModel.findOne({'email':userInfo.email}).exec();
          if (!user) {
            return response.status(404).json({ message: 'User not found' });
          }
          response.json(user);
        } catch (err) {
          console.error(err);
          response.status(500).json({ message: 'Error retrieving profile' });
        }
    },

    removeAccount(request, response){
        response.json({message:''});
    },
}