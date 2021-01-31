const mongoose = require("mongoose");

const estateSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    //Храним в базе стоимость * 100, тем самым не используя дробные числа
    price: {
        type: Number,
        required: true,
    },
    estateType: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            image: {
                type: Buffer,
                required: true,
            },
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", //Used to fetch user document via task.populate('owner').execPopulate()
    },
});

const Estate = mongoose.model("Estate", estateSchema);

module.exports = Estate;
