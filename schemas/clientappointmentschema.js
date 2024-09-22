const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String
  },
  testname:{
    type:String
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  
  },
 
    area: {
      type: String,
   
    },
    city: {
      type: String,
     
    },
    state: {
      type: String,
  
    },
    postalCode: {
      type: String,
     
    },
 
  appointmentDate: {
    type: Date,
   
  },
  timeSlot: {
    type: String,

  },
  additionalInfo: {
    type: String,
  
  },

  hospitalid:{
    type:String
},
bookedDate:{
    type:Date,
    default:Date.now
},
transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
