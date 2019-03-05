const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssuesSchema = new Schema({

    issues_name: {
        type: String,
        required: true,
      }
    
    });
    
    const Issues = module.exports = mongoose.model('Issues', IssuesSchema);
    
    module.exports.getAllIssues = function(callback){
        Issues.find({},callback)
    }
    