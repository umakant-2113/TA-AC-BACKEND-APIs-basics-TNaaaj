const { json } = require('express');
let express = require('express');
let router = express.Router();

let Book = require('../model/Book');

// creat book 

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(" ");
  req.body.category = req.body.category.split(" ");
  Book.create(req.body, (err, book) => {
    console.log(book)
    if (err) return next(err);
    res.json(book);
  });
});
// list of book
router.get("/",(req,res,next)=>{
  Book.find({},(err,books)=>{
    if(err) return next(err);
    res.json(books)
  })
})
// edit category
router.get("/:id/edit",(req,res,next)=>{
  let id=req.params.id;
  Book.findByIdAndUpdate(id,req.body,{new:true},(err,book)=>{
    if(err) return next(err);
    res.json(book)
  })
})

// delete category
router.get("/:id/delete",(req,res,next)=>{
  let id=req.params.id;
  Book.findById(id,(err,book)=>{
    if(err) return next(err);
    book.category.splice(0,2)
    res.json(book)
  })
})

// list all category

router.get("/category",(req,res,next)=>{
  Book.distinct("category",(err,book)=>{
    if(err) return next(err);
    res.json(book)
  })
})

// list book by category

router.get("/filteByCategory",(req,res,next)=>{
  let category=req.query;
  Book.find(category,(err,books)=>{
    if(err) return next(err);
    res.json(books)
  })
})
// count books for each category
router.get("/filter",(req,res,next)=>{
  let arr=[]
  let category=req.query;
  Book.find(category,(err,books)=>{
    if(err) return next(err);
    arr.push(books.length)
    res.json({books,arr})
  })
})

// list books by author
router.get("/author",(req,res,next)=>{
  let author=req.query;
  Book.find(author,(err,books)=>{
    if(err) return next(err);
    res.json(books)
  })
})
// tags base filter

// list all tags
router.get("/tagsList",(req,res,next)=>{
  Book.distinct("tags",(err,tags)=>{
    if(err) return next(err);
    res.json(tags)
  })
})

// list tags in ascending/descending order

router.get("/tags",(req,res,next)=>{
  Book.distinct("tags",(err,tags)=>{
    tags.sort((a,b)=>a.length-b.length)
    if(err) return next(err);
    res.json(tags)
  })
})

// filter book by tags

router.get("/filterByTags",(req,res,next)=>{
  let tags=req.query;
  Book.find(tags,(err,books)=>{
    if(err) return next(err);
    res.json(books)
  })
})

// get count of number of books for each tag

router.get("/numberofBooks",(req,res,next)=>{
  let arr=[]
  let tags=req.query;
  Book.find(tags,(err,books)=>{
arr.push(books.length)
if(err) return next(err);
res.json({books , arr})
  }) 
})
module.exports = router;
