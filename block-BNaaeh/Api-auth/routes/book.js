var express = require('express');
var router = express.Router();

let Book = require('../module/Book');
// let Comment=require("../module/Comments")

router.post('/', function (req, res, next) {
  req.body.tags = req.body.tags.split(",");
  Book.create(req.body, (err, book) => {
    console.log(book)
    if (err) return next(err);
    res.json(book);
  });
});

router.get("/",(req,res,next)=>{
    Book.find({},(err,books)=>{
        if(err) return next(err);
        res.json(books)
    })
})

router.get("/:id",(req,res,next)=>{
    let id=req.params.id;
    Book.findById(id,(err,book)=>{
        if(err) return next(err);
        res.json(book)
    })
})

router.put("/:id",(req,res,next)=>{
let id=req.params.id;
console.log(req.body)
Book.findByIdAndUpdate(id,req.body,(err,updatedbook)=>{
    if(err) return next(err)
    res.json(updatedbook)
})
})

router.delete("/:id",(req,res,next)=>{
    let id=req.params.id;
    Book.findByIdAndDelete(id,(err,book)=>{
        if(err) return next(err);
        res.json(book)
    })
})

// comments works


module.exports = router;
