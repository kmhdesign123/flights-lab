import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()
// GET ROUTERS
router.get('/', flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get('/:flightId', flightsCtrl.show)

router.get("/:flightId/edit", flightsCtrl.edit)

// POST ROUTERS
router.post('/', flightsCtrl.create)

router.post('/:flightId/tickets', flightsCtrl.createTicket)

// DELETE ROUTERs
router.delete('/:flightId', flightsCtrl.delete)

// PUT ROUTES
router.put("/:flightId", flightsCtrl.update)

export { router }