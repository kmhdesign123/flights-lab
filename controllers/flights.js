import { Flight } from "../models/flights.js"
import { Meal } from '../models/meals.js'

function newFlight(req, res) {
  res.render("flights/new.ejs", { 
    title: 'Add Flight' 
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    console.log(flights);
    res.render('flights/index', {
      flights: flights,
      title: "All Flights",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.movieId)
  .populate('Meal')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight: flight,
        meals: meals,
      })
    })
  })
}


function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}
function edit(req, res) { 
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render("flights/edit", {
      flight,
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createTicket(req,res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
function addToMeals(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.cast.push(req.body.mealsId)
    flight.save()
		.then(() => {
		  res.redirect(`/flights/${flight._id}`)
		})
    .catch(err => {
      console.log(err)
      res.redirect("/flights")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}


export {
  newFlight as new,
  show,
  create,
  index,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeals
}