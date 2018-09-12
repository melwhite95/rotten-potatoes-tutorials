const express = require('express')

const app = express()
var exphbs = require('express-handlebars');



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });


const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});




//let reviews = [
  //{ title: "Great Review" },
 // { title: "Next Review" }
//]




//app.get('/reviews', (req, res) => {
//    Review.find().then(reviews => {
//res.render('reviews-index', { reviews: reviews });
//})
//.catch(err => {
//      console.log(err);
//    })
//})
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

...
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

...
// CREATE
app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})
















app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
