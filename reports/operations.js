const client = require("../database/db");
const uuid = require("uuid");

async function AddReport(req, res) {
  try {
    //   console.log(req)
    const data = req.body;
    if (!data["reportDetails"]) {
      return res
        .status(404)
        .send({ message: "No report data has been provided" });
    }
    await client.connect();
    const collection = client.db("Gramoday").collection("gramoday");
    const _id = uuid.v4();
    // console.log(_id);
    const returnData = await collection.insertOne({
      ...data["reportDetails"],
      _id,
    });
    return res.send({ status: "Success", reportID: _id });
  } catch (error) {
    // console.log(error);
    return res.send({ message: error.message });
  }
}

async function GetReport(req, res) {
  try {
    await client.connect();
    const collection = client.db("Gramoday").collection("gramoday");
    // console.log(req.query);
    const _id = req.query.reportID;
    if (!_id) {
      return res
        .status(404)
        .send({ message: "No report ID has been provided" });
      //   throw new Error();
    }
    // console.log(_id);
    const data = await collection.findOne({
      _id,
    });
    if (!data) {
      return res
        .status(404)
        .send({ message: "No report has been found with such reportID" });
    }
    const allUsersData = await collection
      .find({
        cmdtyID: data.cmdtyID,
        marketID: data.marketID,
      })
      .toArray();
    // console.log(allUsersData);
    var allUsers = [];
    var totalPriceAvg = 0;
    if (allUsersData && allUsersData.length) {
      for (var i = 0; i < allUsersData.length; i++) {
        allUsers.push(allUsersData[i].userID);
        totalPriceAvg += allUsersData[i].price / allUsersData[i].convFctr;
      }
      totalPriceAvg = totalPriceAvg / allUsersData.length;
      allUsers = allUsers.filter(
        (item, index) => allUsers.indexOf(item) === index
      );
    }
    const returnData = {
      ...data,
      users: allUsers,
      timestamp: data.time,
      priceUnit: "Kg",
      price: totalPriceAvg,
      timestamp: Date.now(),
    };
    // console.log(returnData);
    delete returnData["userID"];
    // console.log(returnData);
    return res.send(returnData);
  } catch (error) {
    console.log(error);
    throw new Error("BROKEN");
  }
}

module.exports = { AddReport, GetReport };
