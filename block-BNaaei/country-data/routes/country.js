var express = require('express');
var router = express.Router();
let Country = require('../modal/Country');
let State = require('../modal/State');

// assecending order of population
router.get("/data", (req,res,next)=>{
  Country.find({},(err,country)=>{
    country.sort((a,b)=> a.population-b.population)
    if(err) return next(err);
    res.json(country)
  })
})

 // filter base on continent
router.get("/continent",(req,res,next)=>{
  let continent=req.query;
  console.log(continent)
  Country.find(continent,(err,country)=>{
    if(err) return next(err);
    res.json(country);
  })
})

  //  list countries based on religions.
  router.get("/religion",(req,res,next)=>{
    let religions=req.query;
    console.log(religions)
    Country.find(religions,(err,country)=>{
      if(err) return next(err);
      res.json(country)
    })
  })
  
  
    //  list countries based on population.
    
  // update/remove a state from any country
 






/* GET Country isting. */
router.get('/', (req, res, next) => {
  Country.find({}, (err, country) => {
    // country.sort((a,b)=>a.population-b.population)
    if (err) return next(err);
    res.json(country);
  });
});

// create country
router.post('/', (req, res, next) => {
  req.body.religion = req.body.religion.split(',');
  Country.create(req.body, (err, country) => {
    if (err) return next(err);
    res.json(country);
  });
});

// uppdate country

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  Country.findByIdAndUpdate(id, req.body,{new:true}, (err, country) => {
    if (err) return next(err);
    res.json(country);
  });
});

// delete country

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Country.findByIdAndDelete(id, (err, country) => {
    if (err) return next(err);
    res.json(country);
  });
});

// state inside country

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  req.body.country = id;
    State.create(req.body, (err, states) => {
      if(err) return next(err);
      Country.findByIdAndUpdate(
        id,
        { $push: { state: states._id } },{new:true},
        (err, country) => {
          if (err) return next(err);
          res.json({ country, states });
        }
      );
    });
  });

  // total state in a country

  router.get("/:id/state",(req,res,next)=>{
    let id=req.params.id;
    Country.findById(id).populate("state").exec((err,country)=>{
      if(err) return next(err);
      res.json(country)
    })
  })

  // neighbour country of a country

  router.get("/:id",(req,res,next)=>{
    let id=req.params.id;
    Country.findById(id).populate("neighbouring_countires").exec((err,country)=>{
      if(err) return next(err);
      res.json(country)
    })
    })
// list all religions present in entire country dataaset.
router.get("/allreligion",(req,res,next)=>{
  Country.distinct("religion",(err,religion)=>{
    if(err) return next(err);
    res.json(religion)
  })
})


  


module.exports = router;
