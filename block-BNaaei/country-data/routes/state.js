var express = require('express');
var router = express.Router();

let State = require('../modal/State');
let Country = require('../modal/Country');
const { route } = require('./country');

//create state
router.post("/",(req,res,next)=>{
    State.create(req.body,(err,state)=>{
        if(err) return next(err)
        res.json(state)
    })
})

// list  of state

router.get("/",(req,res,next)=>{
    State.find({},(err,state)=>{
        if(err) return next(err);
        res.json(state)
    })
})

// neighbour state

router.put("/:id",(req,res,next)=>{
    let id=req.params.id;
       State.findByIdAndUpdate(id,req.body,{new:true},(err,state)=>{
        if(err) return next(err)
        res.json(state)
       }) 
    })

// assecnding order of population
router.get("/population",(req,res,next)=>{
    State.find({},(err,state)=>{
        state.sort((a,b)=>a.population-b.population);
        if(err) return next(err);
        res.json(state)
    })
})



    // delete state
    router.delete("/:id",(req,res,next)=>{
        let id=req.params.id;
        Country.findByIdAndDelete(id, {new:true},(err,state)=>{
            if(err) return next(err);
            res.json(state)
        })
    })

    // neighbour state of a state 
    router.get("/:id",(req,res,next)=>{
        let id=req.params.id;
        State.findById(id).populate("neighbouring_states").exec((err,state)=>{
            if(err) return next(err);
            res.json(state)
        })
    })

    // which state inside which country
    router.get("/:id/country",(req,res,next)=>{
let id=req.params.id;
State.findById(id).populate("country").exec((err,state)=>{
    if(err) return next(err);
    res.json(state)
})
    })




module.exports = router;
