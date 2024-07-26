const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const Product = require("./models/product.js")

mongoose
  .connect("mongodb://localhost:27017/express-mongodb1", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("MongoDbエラー", error))


app.set("views", path.join(__dirname, "views"))

app.set("view engine", "ejs")





app.get("/dogs",(req,res)=>{
  res.send("dogs")
})

app.listen(3000, () => {
  console.log("port3000")
})
