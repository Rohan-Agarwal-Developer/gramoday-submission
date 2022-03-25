## Submission for Gramoday

This application

1. Takes reports from several users that consists of a market-commodity combination for which prices in the Mandi(Market) are provided in a certain unit (along with their conversion factor to base unit - Kg)
2. Returns the aggregated report for each unique pair of market-id and commodity-id

## APIs

The application has two apis:

1. POST /reports
   {
   "reportDetails": {
   "userID": "user-1",
   "marketID": "market-1",
   "marketName": "Vashi Navi Mumbai",
   "cmdtyID": "cmdty-1",
   "marketType": "Mandi",
   "cmdtyName": "Potato",
   "priceUnit": "Pack",
   "convFctr": 50,
   "price": 700
   }
   }

Response:
{
status: "success",
reportID: "949832f8-48c7-4cb2-8dcd-98f046a9a2e3"
}

This api saves the report into the database

2. GET /reports?reportID=949832f8-48c7-4cb2-8dcd-98f046a9a2e3

Response:
{
"\_id": "949832f8-48c7-4cb2-8dcd-98f046a9a2e3",
"cmdtyName": "Potato",
"cmdtyID": "VE-42",
"marketID": "market-1",
"marketName": "Vashi Navi Mumbai",
"users": ["user-1", "user-2"],
"timestamp": 1616198400000,
"priceUnit": "Kg",
"price": 15
}

## Instructions to Run

1. Download or Clone the repository into local machine <br />
2. Run npm install to install all the required packages <br />
3. Issue an environemnt variable to mongodb database. As password is required for this I have not included it in commit. First make a cluster in mongodb atlas, then go to connect -> connect ot application. The link is listed in the container. Please use mongodb url to connect to database. set DATABASE_URI = MongodbUri
4. Run npm start to start the server at port 3000 <br />
5. Make request to ablve listed apis, the file Gramoday.postman_collection.json can be imported into postman and directly checked <br />
6. To run all the test cases: npm test <br />

## Test Cases

The test cases are written in JEST framework. Two test cases have been built to test each API:

1. The first test checks weather the post request is able to save the document. <br />
2. The second test case checks the response and also if the prices returned is the same as calculated theoretically.<br />
