const express = require("express");
const cors = require("cors");
const userRouter = require("./user/router");
const plantRouter = require("./plant/router");

const app = express();
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const parser = express.json();
app.use(parser);

app.use(userRouter);
app.use(plantRouter);

app.listen(port, () => console.log(`Listening on :${port}`));
