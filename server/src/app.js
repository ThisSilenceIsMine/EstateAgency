const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.get("/", async (req, res) => {
    res.send("Hello, backend!");
});

app.listen(port, console.log("Server is up and running on port 3000"));
