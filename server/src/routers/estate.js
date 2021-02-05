const express = require("express");
const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
require("../db/mongoose.js");
const Estate = require("../db/models/estateModel");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
            return cb(new Error("Incorrect format. Please, upload an image"));
        }

        cb(undefined, true);
    },
});

const router = express.Router();

router
    .route("/api/estates")
    .post(
        auth,
        upload.array("photos"),
        async (req, res) => {
            const estate = new Estate({
                ...req.body,
                owner: req.user._id,
            });
            try {
                req.files.forEach((file) => {
                    estate.images.push({ image: file.path });
                    console.log("path = ", file.path);
                });
                await estate.save();
                res.send(estate);
            } catch (error) {
                res.status(500).send(error);
            }
        },
        (error, req, res, next) => {
            res.status(400).send({ error: error.message });
        }
    )
    .get(async (req, res) => {
        try {
            const estates = await Estate.find({});
            res.send(estates);
        } catch (error) {
            res.status(500).send(error);
        }
    });

router.get("/api/estates/my", auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate("estates").execPopulate();
        res.send(req.user.estates);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get("/api/estates/:id/contacts", async (req, res) => {
    try {
        const estate = await Estate.findById(req.params.id);
        await estate.populate("owner").execPopulate();

        const contactData = (({ name, email, phoneNumber }) => ({
            name,
            email,
            phoneNumber,
        }))(estate.owner);
        // console.log("estate :>> ", estate);
        res.send(contactData);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(404).send();
    }
});
router
    .route("/api/estates/:id")
    .get(async (req, res) => {
        try {
            // const tasks = await Task.find({ owner: req.user._id });
            const estate = await Estate.findOne({
                _id: req.params.id,
            });

            if (!estate) {
                res.status(404).send();
            }

            res.send(estate);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .patch(auth, async (req, res) => {
        const allowedUpates = [
            "title",
            "description",
            "price",
            "placement",
            "estateType",
        ];
        const updates = Object.keys(req.body);
        const isValid = updates.every((update) =>
            allowedUpates.includes(update)
        );

        if (!isValid) {
            return res.status(400).send({ error: "Invalid updates" });
        }

        try {
            const estate = await Estate.findOne({
                _id: req.params.id,
                owner: req.user._id,
            });
            updates.forEach((update) => (estate[update] = req.body[update]));
            await estate.save();

            res.send(estate);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete(auth, async (req, res) => {
        try {
            const estate = await Estate.findOneAndDelete({
                _id: req.params.id,
                owner: req.user._id,
            });

            res.send(estate);
        } catch (error) {
            res.status(500).send();
        }
    });

module.exports = router;
