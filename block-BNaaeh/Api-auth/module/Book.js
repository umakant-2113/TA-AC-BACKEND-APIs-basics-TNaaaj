let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let bookSchema= new Schema({
    title:{type:String,required:true},
    description:{type:String},
    author:{type:String},
    tags:[String],
    pages:{type:Number}
})

module.exports=mongoose.model("Book" , bookSchema)