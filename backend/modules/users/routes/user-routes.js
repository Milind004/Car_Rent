//user-routes.js

import express from 'express';
import {userController} from '../controller/user-controller.js';

export const userRoute= express.Router();
userRoute.post('/login', userController.login);
userRoute.post('/register', userController.register);
userRoute.get('/profile/:name', userController.profile);
userRoute.put('/change-password', userController.changePassword);
userRoute.delete('/remove-account', userController.removeAccount);