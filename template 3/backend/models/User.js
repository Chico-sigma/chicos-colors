const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["color", "palette"],
      required: true
    },
    itemId: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      trim: true,
      maxlength: 120
    },
    hex: {
      type: String,
      trim: true,
      uppercase: true,
      match: /^#[0-9A-F]{6}$/
    },
    colors: {
      type: [String],
      validate: {
        validator: (colors) => colors.length <= 20 && colors.every((color) => /^#[0-9A-F]{6}$/i.test(color)),
        message: "Favorite palettes may contain up to 20 valid HEX colors."
      }
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    favorites: {
      type: [favoriteSchema],
      default: []
    }
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (_document, returned) => {
    delete returned.password;
    delete returned.__v;
    return returned;
  }
});

module.exports = mongoose.model("User", userSchema);
