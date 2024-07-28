const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const Product = require("./models/product.js")
const { urlencoded } = require("body-parser")
const methodOverride = require("method-override")
const Farm = require("./models/farm")

mongoose
  .connect("mongodb://localhost:27017/farmstand", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))

app.set("views", path.join(__dirname, "views"))

app.set("view engine", "ejs")

app.use(urlencoded({ extended: true }))

app.use(methodOverride("_method"))

const categories = ["果物", "野菜", "乳製品"]
//* Farm関連

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({})
  res.render("farms/index", { farms })
})

app.get("/farms/new", (req, res) => {
  res.render("farms/new")
})

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body)
  await farm.save()
  res.redirect("/farms")
})

app.get("/farms/:id", async (req, res) => {
  const { id } = req.params
  const farm = await Farm.findById(req.params.id).populate("products")
  console.log(farm)
  res.render("farms/show", { farm })
})

app.get("/farms/:id/products/new", (req, res) => {
  const { id } = req.params
  res.render("products/new", { categories, id })
})

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params
  const farm = await Farm.findById(id)
  const { name, price, category } = req.body
  const product = new Product({ name, price, category })
  farm.products.push(product) //* 配列追加
  product.farm = farm
  await farm.save()
  await product.save()
  res.redirect(`/farms/${farm._id}`)
  // res.send(farm)

  // res.send(req.body)
})

//

app.get("/products", async (req, res) => {
  const { category } = req.query //* queryじゃない
  // console.log(category)
  if (category) {
    const products = await Product.find({ category })
    console.log(category)
    res.render("products/index", { products, category })

    //* categoryがparamsにあったらcategoryをdbから検索　名前一緒だから省略記法
  } else {
    const products = await Product.find({}) //* 全部find 時間かかるからasync await ()内に{}入れるの忘れないで
    // console.log(products)
    res.render("products/index", { products, category: "全" })
  }
})

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories })
})

app.post("/products", async (req, res) => {
  console.log(req.body)
  // const { name, price, category } = req.body
  // console.log(name,price,category)
  const newProduct = new Product(req.body)
  await newProduct.save()
  console.log(newProduct)
  res.redirect(`/products/${newProduct.id}`)
  //* postだから //* おまじない書かなきゃ app.use(urlencoded({extended: true}))
  //* formからのをぱーすする
})

app.get("/products/:id", async (req, res) => {
  const { id } = req.params
  // console.log(id)
  const product = await Product.findById(id) //* id検索 時間かかる
  // res.send(product)
  res.render("products/show", { product })
})

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id) //* id検索 時間かかる
  res.render("products/edit", { product, categories })
})

app.put("/products/:id", async (req, res) => {
  const { id } = req.params
  // console.log(id)
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }) //* 待たないと
  //* 第一引数が調べたいもの　第二引数が変更したいキーとバリュー
  //  console.log(product)
  res.redirect(`/products/${product._id}`)
  // console.log("put")
  // console.log(req.body)
  // res.send("aa")
})

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndDelete(id) //* id検索 時間かかる 消すだけだから変数に入れる必要がない
  res.redirect("/products")
})

app.get("/dogs", (req, res) => {
  res.send("dogs")
})

app.listen(3000, () => {
  console.log("port3000")
})
