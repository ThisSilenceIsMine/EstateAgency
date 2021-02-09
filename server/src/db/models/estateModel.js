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
    placement: {
        type: String,
        required: true,
        trim: true,
    },
    action: {
        type: String,
        enum: ["Sell", "Rent"],
        required: true,
    },
    estateType: {
        type: String,
        enum: ["Квартира", "Будинок", "Ділянка", "Комерційна"],
        required: true,
    },
    images: [
        {
            image: {
                type: String,
            },
        },
    ],
    //Для доступа к автору через estate.populate('owner').execPopulate()
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

estateSchema.path("price").get(function (num) {
    return (num / 100).toFixed(2);
});

estateSchema.path("price").set(function (num) {
    return num * 100;
});

const Estate = mongoose.model("Estate", estateSchema);

module.exports = Estate;
