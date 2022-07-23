let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let stateSchema=new Schema({
name:{type:String},
country :[{type:Schema.Types.ObjectId, ref:"Country"}],
population:{type:Number},
area:{type:Number},
neighbouring_states:[{type:Schema.Types.ObjectId ,ref:"State"}]
})

module.exports=mongoose.model("State",stateSchema)