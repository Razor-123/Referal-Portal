const express = require('express');
const userRouter = express.Router();
const {signup,login,logout,protectRoute} = require('../controller/authController');
const {getMyProfile,createReward, updateUser, deleteUser, receiveReward} = require('../controller/userController')

userRouter.route('/signup')
    .post(signup)
    .get((req,res)=>res.json({
        message:"get signup called"
    }))

userRouter.route('/login')
    .post(login)
    .get((req,res)=>res.json({
        message:"get login called"
    }))

userRouter.route('/logout')
    .get(logout)

userRouter.use(protectRoute);

userRouter.route('/myprofile')
    .get(getMyProfile)
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/receive/:rewardid')
    .get(receiveReward)

userRouter.route('/createreward')
    .post(createReward)

module.exports = userRouter;
