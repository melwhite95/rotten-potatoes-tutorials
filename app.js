const express = require('express')

const app = express()
var exphbs = require('express-handlebars');


let reviews = [
  { title: "Great Review" },
  { title: "Next Review" }
]


//app.get('/', (req, res) => {
  //res.send('Hello World!')
//})

//app.get('/', (req, res) => {
 // res.render('home', { msg: 'Hello World!' });
//})

app.get('/reviews', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

















app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
