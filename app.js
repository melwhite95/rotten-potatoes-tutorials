// DECLARATIONS
const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
//const Review = require('./models/review')
const reviews = require('./controllers/reviews');
const Review = mongoose.model('reviews', {
  title: String,
  description: String,
  movieTitle: String
});

  //require('./controllers/reviews')(app);

// BOOSTRAPPING THE APP
const app = express()


//require('./controllers/reviews')(app);
// MIDDLEWARE
mongoose.connect('mongodb://localhost/rotten-potatoes',{ useNewUrlParser: true });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))


// MODELS



// ROUTES

// INDEX
app.get('/', (req, res) => {
   Review.find().then(reviews => {
    res.render('reviews-index', { reviews: reviews });
  })
  .catch(err => {
    console.log(err);
  });
});


// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new')
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

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
module.exports = function(app){}
module.exports = app;
// SERVER
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
