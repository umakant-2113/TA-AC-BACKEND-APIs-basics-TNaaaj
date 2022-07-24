let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let countrySchema=new Schema({
name:{type:String,required:true},
state: [{type:Schema.Types.ObjectId,ref:"State"}],
continent:{type:String},
population:{type:Number},
religion:[String],
neighbouring_countires:[{type:Schema.Types.ObjectId,ref:"Country"}],
area:{type:Number}
})

module.exports=mongoose.model("Country",countrySchema)