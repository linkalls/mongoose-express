const mongoose = require("mongoose")
const { Schema } = mongoose

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "nameが必要です"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "emailが必要です"],
  },
  products: {
    type: Schema.Types.ObjectId,
    ref: "Product", //*farmからproduct これで相互参照
  },
})

const Farm = mongoose.model("Farm", farmSchema)

module.exports = Farm //* 両方に持たせよう
