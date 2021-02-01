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

router.post(
    "/estates",
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
);

module.exports = router;
