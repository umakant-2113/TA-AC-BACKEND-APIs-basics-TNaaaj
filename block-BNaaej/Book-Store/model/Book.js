let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let bookSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String},
    tags:[{type:String}],
    author:{type:String},
    pages:{type:Number},
    category:[{type:String}]
})

module.exports=mongoose.model("Book",bookSchema)