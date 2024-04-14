var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    }, 
    equipe: {
        required: true,
        type: String,
    }, 
    number: {
        required: true,
        type: String        
    },
    image:{
        required: true,
        type: String,

    }

});


module.exports = mongoose.model('Piloto', schema);