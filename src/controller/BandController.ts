import { Request, Response} from "express"
import { BandBusiness } from "../business/BandBusiness"
import { Authenticator } from "../business/services/Authenticator"
import { IdGenerator } from "../business/services/IdGenerator"
import { BandDatabase } from "../data/BandDatabase"
import { BaseDatabase } from "../data/BaseDatabase"
import { BandInputDTO } from "../model/Band"

export class BandController {
    async registerBand(req: Request, res: Response) {
        try {
            const input: BandInputDTO = {
                name: req.body.name,
                mainGenre: req.body.mainGenre,
                responsible: req.body.responsible
            }
    
            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )
            await bandBusiness.registerBand(input, req.headers.authorization as string)
            
            res.sendStatus(200)
        } catch (error) {
            res.status(error.customErrorCode || 400).send({
                message: error.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
