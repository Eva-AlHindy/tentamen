
## Beskrivning App

Vår app skapar en ny databas som heter homenet. Databasen innehåller  
tabell (Listing) som har följande schema:

## Databeskrivning
```
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
}
```
## Metodbeskrivning
Följande metoder är implementerade i appen:

### listings GET lista alla studenter som en array
```
$ curl -i -X GET localhost:3000/listings


Respons Status: 200 ok

```

### listings/?city="Hovmantorp" hämtar alla stader med sama namn
```
$ curl -i -X GET localhost:3000/listings/?city="Hovmantorp"


Response Status 200 OK

{"address":{"gata":"studentGatan","postnummer":12345,"ort":"studentOrt"},"_id":"5ced1baeaa26ac5340e67fe8","email":"studentNamn@gmail.com","name":"studentNamn","__v":0}

```
### listings/ hämtar en listing By id
```
$ curl -i -X GET localhost:3000/listings/5d00cfd4dbe2fa3788a00a8d


Response Status 200 OK

{"address":{"coordinate":{"lat":10,"lng":0},"streetName":"storgatan","streetNumber":"48C","city":"Hovmantorp"},"_id":"5d00cfd4dbe2fa3788a00a8d","typeSummary":"apartment","price":200000,"monthlyFee":5000,"bidding":true,"__v":0}

```

### listings POST skapa en ny Listing
```
$ curl -i -X POST -H "Content-Type:application/json" localhost:3000/listings -d '{
 "address": {
   "streetName": "storgatan",
   "streetNumber": "48C",
   "city": "Hovmantorp",
   "coordinate": {
     "lat": 10,
     "lng": 20
   }
 },
 "typeSummary": "apartment",
 "price": 200000,
 "monthlyFee": 5000,
 "bidding": false
}'

Respons Status: 201 Created    

```
### listings/{id} GET visa en listing
```
$ curl -i -X GET localhost:3000/listings/5ced1baeaa26ac5340e67fe8

Response Status: 200 OK

{"address":{"gata":"studentGatan","postnummer":12345,"ort":"studentOrt"},"_id":"5ced1baeaa26ac5340e67fe8","email":"studentNamn@gmail.com","name":"studentNamn","__v":0}

```

### listings/{id} PUT skapa eller uppdatera en listing
```
$ curl -i -X PUT -H "Content-Type:application/json" localhost:3000/listings/5d00cf30dbe2fa3788a00a8c -d '{
"address": {
"streetName": "storgatan",
"streetNumber": "48C",
"city": "lessebo",
"coordinate": {
"lat": 10,
"lng": 0
}
},
"typeSummary": "apartment",
"price": 200000,
"monthlyFee": 6000,
"bidding": true}'


  Response Status: 200 Ok

```

### listings/{id} DELETE ta bort en ny listing
$ curl -i -X DELETE localhost:3000/listings/5d00d101562d9e0f54d632c0

Response Status: 200 OK



```
