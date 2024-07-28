idしか入ってないからpopulateしなきゃいけない
```js
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
```
実装例

```js
const farm = await Farm.findById(req.params.id).populate("products") //* オブジェクトのプロパティ名
console.log(farm)
```
を実行するとproductsが展開される
```js
{
  _id: new ObjectId('66a67774d3829a2c5900f20d'),
  name: 'マザー牧場',
  city: 'aq',
  email: 'a@gmail.com',
  __v: 1,
  products: [
    {
      _id: new ObjectId('66a67d3acb302eb0bd7d5510'),
      name: 'Kellie Caldwell',
      price: 236,
      category: '乳製品',
      farm: new ObjectId('66a67774d3829a2c5900f20d'),
      __v: 0
    }
  ]
}
```
ejs側ではこう呼んだ
```erb
  <% for (let product of farm.products){ %> 
      <li><%= product.name %> </li>
  <% } %>
```