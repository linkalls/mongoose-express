//* 初期に投入するデータ  expressとは別で実行するから書く

const mongoose = require("mongoose")
const Product = require("./models/product")

mongoose
  .connect("mongodb://localhost:27017/express-mongodb1", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))
