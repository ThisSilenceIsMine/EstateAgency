const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");
const estateRouter = require("./routers/estate");
const path = require("path");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(userRouter);
app.use(estateRouter);

app.listen(port, console.log(`Server is up and running on port ${port}`));
