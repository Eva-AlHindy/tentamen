get = (req, res, next) => {
  req.models.Listing.find().then((listings) => {
      return res.send(listings);
    }).catch((error) => next(error))
}



getById = (req, res, next) => {
    console.log(req.params._id);
        req.models.Listing.findById(req.params._id)
        .then((listings) => {
            return res.send(listings);
        }).catch((error) => {
            next(error)
        })
}

post = (req, res, next) => {
  console.log(req.body);
  req.models.Listing.create({
     address: {
       streetName:req.body.address.streetName,
       streetNumber:req.body.address.streetNumber,
       city:req.body.address.city,
       coordinate: {
         lat:req.body.address.coordinate.lat,
         lng:req.body.address.coordinate.lng,
     }
     },
    typeSummary:req.body.typeSummary,
    price:req.body.price,
    monthlyFee:req.body.monthlyFee,
    bidding:req.body.bidding
  }).then((listing) => {
    return res.status(201).send(listing)
  }).catch((error) => {
    next(error)
  })
}

put= (req, res, next) => {
  req.models.Listing.updateOne({_id: req.params.listingId},
    {
       address: {
         streetName:req.body.address.streetName,
         streetNumber:req.body.address.streetNumber,
         city:req.body.address.city,
         coordinate: {
           lat:req.body.address.coordinate.lat,
           lng:req.body.address.coordinate.lng,
       }
       },
      typeSummary:req.body.typeSummary,
      price:req.body.price,
      monthlyFee:req.body.monthlyFee,
      bidding:req.body.bidding
    },
    {
      new: true,
      upsert: true,
      runvalidators: true
    }).then((status) => {
      console.log("status: ", status)
      if (status.upserted)
        res.status(201)
      else if (status.nModified)
        res.status(200)
      else
        res.status(204)
    res.send()
    }).catch((error) => next(error))
}

deleteListing = (req, res, next) => {
  console.log(req.params.listingId);
  req.models.Listing.findByIdAndDelete(req.params.listingId).then((listing)=> {
    if (listing)
      return res.send(listing).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

module.exports = {
  get,
   getById,
 post,
 put,
 deleteListing
}
