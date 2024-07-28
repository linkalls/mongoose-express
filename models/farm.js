const mongoose = require("mongoose")
const { Schema } = mongoose
const Product = require("./product")

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
  products: [
    {
      type: Schema.Types.ObjectId, //* idしか入ってないからpopulateのProductsしなきゃいけない
      ref: "Product", //*farmからproduct これで相互参照
    },
  ],
})

farmSchema.post("findOneAndDelete",async function(farm){ //* nextを呼ぶ必要がなくなった(mongooseのみ)
if(farm.products.length){ //* 中身がidになってる
const result = await Product.deleteMany({id: {$in: farm.products}}) //* farm.productsに含まれるものを削除対象に
}
})

const Farm = mongoose.model("Farm", farmSchema)

module.exports = Farm //* 両方に持たせよう
