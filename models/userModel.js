const mongoose  = require('mongoose');
const db_link = 'mongodb+srv://shaleen:shaleen123@cluster0.cfki2nf.mongodb.net/?retryWrites=true';
mongoose.connect(db_link)
    .then((db)=>{
        console.log('user database connected');
    })
    .catch((err)=>{
        console.log("database connection error: ",err);
    })

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide your email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password length must be eight"]
    },
    confirmPassword:{
        type:String,
        require:[true,"Please confirm the password"],
        validate:{
            validator: function(){
                return this.confirmPassword == this.password;
            },
            message:"Passwords not similar"
        }
    },
    rewards:{
        type:Number,
        default:10000,
    },
    rewardsCreated:[{
        type:mongoose.Schema.ObjectId,
        ref:'rewardModel'
    }],
    rewardsReceived:[{
        reward:{
            type:mongoose.Schema.ObjectId,
            ref:'rewardModel'
        },
        device:{
            type:String,
            default:"Hello"
        }
    }]
})

userSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

userSchema.post('save',function(error,doc,next){
    if (error && error.name==="MongoServerError" && error.code === 11000) next(new Error('Email is already registered'));
    else next(error);
});

userSchema.pre(/^find/,function(next){
    this.populate("rewardsCreated");
    this.populate("rewardsReceived.reward");
    next();
})


const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;