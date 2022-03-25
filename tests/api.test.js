const { AddReport, GetReport } = require("../reports/operations");
const request = require("supertest");
const app = require("../server");
// const { request } = require("express");
// const request = require(request);

// const
const users = ["testUserA1", "testUserB1"];
const convFctr = [100, 50];
const prices = [1000, 400];
// const

var id = "";

it("Add Report", async () => {
  const req1 = {
    body: {
      reportDetails: {
        userID: users[0],
        marketID: "market-1",
        marketName: "Vashi Navi Mumbai",
        cmdtyID: "cmdty-10",
        marketType: "Mandi",
        cmdtyName: "Potato",
        priceUnit: "Pack",
        convFctr: convFctr[0],
        price: prices[0],
      },
    },
  };
  await request(app).post("/reports").send(req1.body).expect(200);

  const req2 = {
    body: {
      reportDetails: {
        userID: users[1],
        marketID: "market-1",
        marketName: "Vashi Navi Mumbai",
        cmdtyID: "cmdty-10",
        marketType: "Mandi",
        cmdtyName: "Potato",
        priceUnit: "Pack",
        convFctr: convFctr[1],
        price: prices[1],
      },
    },
  };
  const response = await request(app)
    .post("/reports")
    .send(req2.body)
    .expect(200);
//   console.log(response.body);
  id = response.body.reportID;
});

it("Get Report", async () => {
  const reportID = id;
//   console.log(id);
  const response = await request(app)
    .get(`/reports?reportID=${reportID}`)
    .expect(200);
//   console.log(response.body);
  expect(response.body.price).toEqual(
    (prices[0] / convFctr[0] + prices[1] / convFctr[1]) / 2
  );

  expect(response.body.users).toEqual([users[0], users[1]]);
});
