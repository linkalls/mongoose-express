const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["果物", "野菜", "乳製品"], //* ここで設定された値以外を入れようとするとエラーになるらしい。
  },
  farm: {
    type: Schema.Types.ObjectId, //* id
    ref: "Farm", //*  Farmモデルを親
  },
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product //* これでほかのファイルから使いやすく
