const express = require("express");
const cors = require("cors");
const logingRouter = require("./auth/router");
const userRouter = require("./user/router");
const plantRouter = require("./plant/router");
const noteRouter = require("./note/router");
const alarmRouter = require("./alarm/router");

const logingRouter = require("./auth/router");

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

app.listen(port, () => console.log(`Listening on :${port}`));
