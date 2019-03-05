const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TicketSchema = new Schema({

  project: {
    type: String,
  },
  summary: {
    type: String,
  },
  issue: {
    type: String,
  },
  priority: {
    type: String,
  },
  assigne: {
    type: String,
    
  },
  reporter: {
    type: String, 
  }
});

const Ticket = module.exports = mongoose.model("Ticket", TicketSchema);
module.exports.getAllTicket = function(callback){
  Ticket.find({},callback)
}