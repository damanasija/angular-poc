const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({

    category_name: {
        type: String,
        required: true,
      }
    
    });
    
    const Categories = module.exports = mongoose.model('Categories', CategoriesSchema);
    
    module.exports.getAllCategories = function(callback){
      Categories.find({},callback)
    }
    