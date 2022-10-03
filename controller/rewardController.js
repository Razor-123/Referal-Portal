const userModel = require('../models/userModel');
const rewardModel = require('../models/rewardModel');

module.exports.getAllRewards = async function getAllRewards(req,res){
    try{
        let allrewards = await rewardModel.find();
        res.json({
            status:"ok",
            message:"rewards fetched success",
            data:allrewards
        })
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}
