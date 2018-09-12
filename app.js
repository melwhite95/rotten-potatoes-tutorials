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
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

//CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
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
//app.post('/reviews', (req, res) => {
  //console.log(req.body);
  // res.render('reviews-new', {});
//})



const express = require('express')
const methodOverride = require('method-override')

...

const app = express()

...

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})









app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
