import { Router } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from './models/orphanage'
import OrphanagesController from './controllers/orphanages-controller'
import multer from 'multer'
import uploadConfig from './config/upload'


const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

export default routes