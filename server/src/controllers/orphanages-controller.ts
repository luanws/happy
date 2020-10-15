import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError"
import Image from "../models/images"
import Orphanage from "../models/orphanage"

export default class OrphanagesController {
    static async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage)
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })
        return response.json(orphanages)
    }

    static async create(request: Request, response: Response) {
        try {
            const orphanagesRepository = getRepository(Orphanage)

            const requestImages = request.files as Express.Multer.File[]
            const images = requestImages.map(image => { return { path: image.filename } as Image })
            console.log(requestImages, images)

            const orphanage = orphanagesRepository.create({
                images,
                ...request.body
            })
            await orphanagesRepository.save(orphanage)
            return response.status(201).json(orphanage)
        } catch (e) {
            return response.send(e)
        }
    }

    static async show(request: Request, response: Response) {
        try {
            const { id } = request.params
            const orphanagesRepository = getRepository(Orphanage)
            const orphanage = await orphanagesRepository.findOneOrFail(id)
            return response.json(orphanage)
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                return response.json({ message: 'Orfanato não encontrado' })
            } else {
                return response.send(e)
            }
        }
    }
}