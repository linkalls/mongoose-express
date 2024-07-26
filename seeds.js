//* 初期に投入するデータ  expressとは別で実行するから書く

const mongoose = require("mongoose")
const Product = require("./models/product")

mongoose
  .connect("mongodb://localhost:27017/express-mongodb1", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))

// const p = new Product({ //* classだよ
//   name: "ruby",
//   price: 198,
//   category: "果物",
// })

// p.save()
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e))

const dummyData = [
  { name: "りんご", price: 150, category: "果物" },
  { name: "バナナ", price: 100, category: "果物" },
  { name: "カボチャ", price: 200, category: "野菜" },
  { name: "ピーマン", price: 80, category: "野菜" },
  { name: "チーズ", price: 300, category: "乳製品" },
  { name: "ヨーグルト", price: 250, category: "乳製品" },
  { name: "アーモンド", price: 500, category: "果物" },
  { name: "ブロッコリ", price: 70, category: "野菜" },
  { name: "パルムソース", price: 180, category: "乳製品" },
  { name: "オレンジ", price: 130, category: "果物" },
]

Product.insertMany(dummyData)
  .then((data) => console.log(data))
  .catch((e) => console.log(e))
//* 複数の場合いっこでもvalidation引っかかったら一個も保存され
