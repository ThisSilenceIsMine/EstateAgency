const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");
const estateRouter = require("./routers/estate");
const path = require("path");

const app = express();
// const port = process.env.PORT || 9000;

app.use(cors());
app.use("/api/uploads", express.static(path.join(__dirname, "/../uploads")));

app.use(express.json());
app.use(userRouter);
app.use(estateRouter);

module.exports = app;

if (require.main === module) {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`API server listening on port ${port}`);
    });
}
