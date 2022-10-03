const mongoose = require('mongoose');
const db_link = 'mongodb+srv://shaleen:shaleen123@cluster0.cfki2nf.mongodb.net/?retryWrites=true';

mongoose.connect(db_link)
    .then((db)=>{
        console.log("reward database connected");
    })
    .catch((err)=>{
        console.log("database connection error: ",err);
    })

rewardSchema = mongoose.Schema({
    created:{ // time
        type:Date,
        default:Date.now()
    },
    creator:{ // user id
        type:String
    },
    amount:{
        type:Number,
        required:[true,"Please Enter valid amount"]
    }
})



rewardSchema.pre(/^find/,function(next){
    next();
})

const rewardModel = mongoose.model('rewardModel',rewardSchema);
module.exports = rewardModel