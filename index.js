const express = require("express");
const cors = require("cors");
var cron = require("node-cron");
const logingRouter = require("./auth/router");
const userRouter = require("./user/router");
const plantRouter = require("./plant/router");
const noteRouter = require("./note/router");
const alarmRouter = require("./alarm/router");
const subscriptionRouter = require("./notification/subscriptionHandler");
const main = require("./notification/scheduleAlarm");

cron.schedule("*/1 * * * *", async () => {
  console.log("Running alarm triggers...");
  await main();
});

const app = express();
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const parser = express.json();
app.use(parser);

app.use(logingRouter);
app.use(userRouter);
app.use(plantRouter);
app.use(noteRouter);
app.use(alarmRouter);
app.use(subscriptionRouter);

app.listen(port, () => console.log(`Listening on :${port}`));
