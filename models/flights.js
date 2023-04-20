import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0}
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
    required: true
  },
  airport: {
    type: String, 
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    // default: ["DEN"],
    required: true
  },
  flightNo: {
    type: Number,
    max: 9999,
    min: 10,
    required: true
  },
  departs: {
    type: Date,
    default:function() {
    },
    required: true
  },
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

const Ticket = mongoose.model('Tickets', ticketSchema)

export {
  Flight,
  Ticket
}
