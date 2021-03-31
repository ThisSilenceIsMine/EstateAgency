const jwt = require("jsonwebtoken");
const getUserByToken = require("./getUserByToken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const payload = jwt.verify(token, "lampoilropebombs");

        const user = await getUserByToken(token, payload);

        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        console.log("error", error);
        res.status(401).send({ error: "Please authenticate" });
    }
};

module.exports = auth;
