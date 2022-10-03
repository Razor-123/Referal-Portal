const userModel = require('../models/userModel');
const rewardModel = require('../models/rewardModel');

// my profile (all data)
module.exports.getMyProfile = async function getMyProfile(req,res){
    try{
        let id = req.id;
        //console.log(id);
        const user = await userModel.findById(id);
        if (user){
            res.json({
                status:"ok",
                message:"user found",
                data:user
            })
        }else{
            res.json({
                status:"error",
                message:"user not found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}


// create Reward
module.exports.createReward = async function createReward(req,res){
    try{
        let id = req.id;
        //console.log(req);
        const user = await userModel.findById(id);
        if (user){
            let data = req.body;
            data['creator'] = id;
            let reward = await rewardModel.create(data);
            if (reward){
                //console.log(Reward);
                let reward_id = reward['_id'];
                //user.rewardsCreated.push({reward:reward_id,device:req.get('User-Agent')});
                user.rewardsCreated.push(reward_id);
                await user.save();
                res.json({
                    status:"ok",
                    message:"reward created succes",
                    data:reward
                })
            }else{
                res.json({
                    status:"error",
                    "message":"Error creating reward"
                })
            }
        }else{
            res.json({
                status:"error",
                "message":"User not found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            "message":err.message
        })
    }
}

// receive reward
module.exports.receiveReward = async function receiveReward(req,res){
    try{
        let reward_id = req.params.rewardid;
        //console.log("reward id",reward_id);
        let id = req.id;
        const user = await userModel.findById(id);
        const reward = await rewardModel.findById(reward_id);
        //console.log(user);
        //console.log(reward);
        if (user && reward){
            let flag = false
            let device = req.get('User-Agent');
            //console.log(Date.now());
            //console.log(reward_id,device)
            for (key in user.rewardsReceived){
                //console.log(user.rewardsReceived[key].reward['_id'].toHexString(),user.rewardsReceived[key].device);
                if (user.rewardsReceived[key].reward['_id'].toHexString()===reward_id && user.rewardsReceived[key].device===device){
                    flag=true;
                    console.log("similar");
                }
            }
            if (flag){
                res.json({
                    status:"ok",
                    "message":"Reward already received"
                })
            }else{
                user.rewardsReceived.push({reward:reward['_id'],device:req.get('User-Agent')});
                user['rewards']+=reward['amount'];
                user.save();
                res.json({
                    status:"ok",
                    "message":"Reward received success"
                })
            }
        }else{
            res.json({
                status:"error",
                "message":"User not defined"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            "message":err.message
        })
    }
}

// update profile
module.exports.updateUser = async function updateUser(req,res){
    try{
        let id = req.id;
        let data = req.body;
        const user = await userModel.findById(id);
        if (user){
            for (let key in data){
                user[key] = data[key];
            }
            await user.save();
            res.json({
                status:"ok",
                message:"user updated success",
                data:user
            })
        }else{
            res.json({
                status:"error",
                message:"user not found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            "message":"error updating user"
        })
    }
}

// delete account
module.exports.deleteUser = async function deleteUser(req,res){
    try{
        let id = req.id;
        const user = await userModel.findByIdAndDelete(id);
        if (user){
            res.json({
                status:"ok",
                message:"user deleted success",
                data:user
            })
        }else{
            res.json({
                status:"error",
                message:"error deleting user"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}
