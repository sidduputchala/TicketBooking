const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ticketsschema = new schema({
    no :{
        type:String              
    },  
    name: {
        type: String
    }, 
    cost:{
        type:String
    },
    availability:{
        type:String
    }
   
});

const tickets = mongoose.model('Tickets',ticketsschema );
module.exports = tickets;