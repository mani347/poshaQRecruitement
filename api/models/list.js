const mongoose=require('mongoose');

const listSchema = mongoose.Schema({
    label: {type: String},
    task:[{type : String}]
 },
{
  collection: 'list'
});

module.exports=mongoose.model('todoList',listSchema);