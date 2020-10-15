import { Router } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from './models/orphanage'
import OrphanagesController from './controllers/orphanages-controller'

const routes = Router()

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', OrphanagesController.create)

export default routes