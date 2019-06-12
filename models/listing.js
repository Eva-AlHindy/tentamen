mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  address: {
      streetName:String,
      streetNumber: String,
      city: String,
      coordinate: {
        lat: {
          type: Number,
        },
        lng: {
          type: Number,
        }
      }
    },
  typeSummary:String,
  price:Number,
  monthlyFee:Number,
  bidding:Boolean
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
