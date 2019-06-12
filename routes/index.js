const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

 router.get("/listings", listing.get);
 router.get("/listings/:_id", listing.getById);
router.post("/listings", listing.post);
router.put("/listings/:listingId", listing.put);
router.delete("/listings/:listingId", listing.deleteListing);

module.exports = router
