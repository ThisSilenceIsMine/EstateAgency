const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Estate = require("./estateModel");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Invalid phone number");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.includes("password")) {
                throw new Error("Please, choose another password");
            }
        },
    },
    rights: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.virtual("estates", {
    ref: "Estate",
    localField: "_id",
    foreignField: "owner",
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.tokens;
    delete userObject.password;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, "lampoilropebombs");

    this.tokens.push({ token });
    await this.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

userSchema.pre("findOneAndDelete", async function (next) {
    // !!!use getQuery() to get document's id!!!!
    await Estate.deleteMany({ owner: this.getQuery()._id });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
