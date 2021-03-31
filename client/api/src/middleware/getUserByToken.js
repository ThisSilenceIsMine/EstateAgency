const User = require("../db/models/userModel");

const getUserByToken = async (token, payload) => {
    const user = await User.findOne({
        _id: payload._id,
        "tokens.token": token,
    });

    if (!user) {
        throw new Error();
    }

    return user;
};

module.exports = getUserByToken;
