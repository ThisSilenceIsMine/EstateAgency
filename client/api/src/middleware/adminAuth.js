const jwt = require("jsonwebtoken");
const getUserByToken = require("./getUserByToken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const payload = jwt.verify(token, "lampoilropebombs");

        const user = await getUserByToken(token, payload);

        if (user.rights != "Admin") {
            return res.status(403).send({ error: "Not allowed" });
        }

        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        res.status(403).send({ error: "Not allowed" });
    }
};

module.exports = auth;
