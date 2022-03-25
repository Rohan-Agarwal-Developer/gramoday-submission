const express = require("express");
const { AddReport, GetReport } = require("./reports/operations");
const app = express();
app.use(express.json());

app.post("/reports", AddReport);

app.get("/reports", GetReport);

// module.exports = { AddReport, GetReport };

app.listen(3000, () => console.log("Gramoday app is listening on port 3000."));

// export app;
module.exports = app;
