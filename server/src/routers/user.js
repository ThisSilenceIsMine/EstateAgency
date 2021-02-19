const express = require("express");
require("../db/mongoose.js");
const User = require("../db/models/userModel");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();
const baseRoute = "/api/users";

router
    .route(`${baseRoute}`)
    .post(async (req, res) => {
        const user = new User(req.body);
        console.log("req.body :>> ", req.body);
        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch (error) {
            // console.log("error :>> ", error);
            res.status(400).send(error);
        }
    })
    .get(adminAuth, async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).send(users);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
// router.get(`${baseRoute}/:id/contacts`, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         const contactData = (({ name, email, phoneNumber }) => ({
//             name,
//             email,
//             phoneNumber,
//         }))(user);

//         if (!contactData) {
//             return res.status(404).send();
//         }

//         res.send(contactData);
//     } catch (error) {
//         console.log("error :>> ", error);
//         res.status(404).send();
//     }
// });
router.post(`${baseRoute}/login`, async (req, res) => {
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

router.post(`${baseRoute}/logout`, auth, async (req, res) => {
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

router.post(`${baseRoute}/logoutall`, auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router
    .route(`${baseRoute}/me`)
    .get(auth, async (req, res) => {
        res.send(req.user);
    })
    .patch(auth, async (req, res) => {
        const allowedUpates = ["name", "email", "phoneNumber"];
        const updates = Object.keys(req.body);
        const isValid = updates.every((update) =>
            allowedUpates.includes(update)
        );
        console.log("req.body :>> ", req.body);
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
    })
    .delete(auth, async (req, res) => {
        try {
            await User.deleteOne({ _id: req.user._id });
            res.send(req.user);
        } catch (error) {
            res.status(500).send();
        }
    });

module.exports = router;
