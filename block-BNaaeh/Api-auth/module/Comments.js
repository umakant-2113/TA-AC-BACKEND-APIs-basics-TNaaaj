let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let commentSchema=new Schema({
    text:{type:String},
    author:{type:String},
    bookId : {type:Schema.Types.ObjectId, ref: "Book"}
})

module.exports=mongoose.model("Comment",commentSchema)