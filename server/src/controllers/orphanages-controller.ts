import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError"
import Image from "../models/images"
import Orphanage from "../models/orphanage"
import OrphanageView from "../views/orphanages-view"
import * as yup from 'yup'

export default class OrphanagesController {
    static async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage)
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })
        return response.json(OrphanageView.renderArray(orphanages))
    }

    static async create(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = request.files as Express.Multer.File[]
        const images = requestImages.map(image => { return { path: image.filename } as Image })

        const { openOnWeekends } = request.body

        const data = {
            images,
            ...request.body,
            openOnWeekends: openOnWeekends === 'true'
        }

        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required().max(300),
            instructions: yup.string().required(),
            openingHours: yup.string().required(),
            openOnWeekends: yup.boolean().required(),
            images: yup.array(yup.object().shape({
                path: yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanagesRepository.create(data)
        await orphanagesRepository.save(orphanage)
        return response.status(201).json(orphanage)
    }

    static async show(request: Request, response: Response) {
        try {
            const { id } = request.params
            const orphanagesRepository = getRepository(Orphanage)
            const orphanage = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images']
            })
            return response.json(OrphanageView.render(orphanage))
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                return response.json({ message: 'Orfanato não encontrado' })
            } else {
                throw e
            }
        }
    }
}