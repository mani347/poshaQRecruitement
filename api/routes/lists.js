const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const List = require('../models/list');

//get all tasks
router.get('/',(req,res,next) => {
    List.find()
    .select('taskName label')
    .exec()
    .then(docs => {
        const response={
            count: docs.length,
            list: docs.map(doc => {
                return{
                    taskName: doc.taskName,
                    label : doc.label
                }
            })
        };
        console.log(docs);
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


// Create label
router.post('/createLabel',(req,res,next) => {
    //console.log("In API");
    List.find({label: req.body.label})
    .exec()
    .then(lists => {
        //console.log("In IF");
        if(lists.length >= 1){
            return res.status(409).json({
                message: 'Label Already exists'
            });
        }else{
            const list=new List({
                label: req.body.label,                  
            });
            list
            .save()
            .then(result => {
                res.status(201).json({
                    message: 'Label Created'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }    
    })
});

//Delete Label
router.delete('/deleteLabel', (req,res,next) => {
    List.remove({label: req.body.label})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Label Deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Update Label
router.patch('/updateLabel/:updateLabel', (req,res,next) => {
    const label=req.params.updateLabel;
    const updatedLabel=req.body.newLabel;
    List.update({label: label}, {"label": updatedLabel}).exec().then(result => {
        res.status(200).json({
            message: 'Label Updated'
        });
    }).catch(err => {   
        error: err
    });
});


//Create Task
router.patch('/createTask',(req,res,next) => {
    List.update({label:"todo"},{$push : { task:req.body.task}}).exec().then(result => {
        res.status(200).json({
            message: 'Task Added To TODO'
        });
    }).catch(err => {   
        error: err
    });
    
});



//Delete Task
router.patch('/deleteTask',(req,res,next) => {
    List.update({label:req.body.label},{$pull : { task:req.body.task}}).exec().then(result => {
        res.status(200).json({
            message: 'Task Deleted From '+req.body.label
        });
    }).catch(err => {   
        error: err
    });
    
});

//Update Task
router.patch('/updateTask',(req,res,next) => {
   
   
    List.update({label:req.body.label},{$pull : { task:req.body.oldTask}}).exec().then(result => {
        res.status(200).json({
            message: 'Task Updated'
        });
    }).catch(err => {   
        error: err
    });
    List.update({label:req.body.label},{$push : { task:req.body.newTask}}).exec().then(result => {
        res.status(200).json({
            // message: 'Task Added To TODO'
        });
    }).catch(err => {   
        error: err
    });
   
    
});


//Move Task
router.patch('/moveTask',(req,res,next) => {

    List.update({label:req.body.fromLabel},{$pull : { task:req.body.task}}).exec().then(result => {
        res.status(200).json({
             message: 'Task moved From '+req.body.fromLabel + ' to '
        });
    }).catch(err => {   
        error: err
    });
    List.update({label:req.body.toLabel},{$push : { task:req.body.task}}).exec().then(result => {
        res.status(200).json({
             message: req.body.toLabel
        });
    }).catch(err => {   
        error: err
    });
   
    
});
module.exports=router;