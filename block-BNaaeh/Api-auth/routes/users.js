var express = require('express');
var router = express.Router();

let Comment = require('../module/Comments');
let Book = require('../module/Book');

/* GET users listing. */
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  req.body.bookId = id;
  Book.findById(id, (err, book) => {
    // console.log(req.body)
    Comment.create(req.body, (err, Comment) => {
      if (err) return next(err);
      res.json({book,Comment});
    });
  });
});

router.get("/:id",(req,res,next)=>{
  let id=req.params.id;
  Book.findById(id,(err,book)=>{
    Comment.find({},(err,Comment)=>{
      if(err) return next(err);
      res.json(Comment)
    })
  })
})

router.put("/:id",(req,res,next)=>{
  let id=req.params.id;
Comment.findByIdAndUpdate(id,req.body,(err,comment)=>{
  if(err) return next(err);
  res.json(comment)
})
})

router.delete("/:id",(req,res,next)=>{
  let id=req.params.id;
  Comment.findByIdAndDelete(id,(err,comment)=>{
    if(err) return next(err);
    res.json(comment)
  })
})

module.exports = router;
