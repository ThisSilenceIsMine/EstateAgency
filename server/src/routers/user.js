const express = require("express");
require("../db/mongoose.js");
const User = require("../db/models/userModel");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post("/users/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
    const allowedUpates = ["name", "email", "phoneNumber"];
    const updates = Object.keys(req.body);
    const isValid = updates.every((update) => allowedUpates.includes(update));

    if (!isValid) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.user._id });
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;