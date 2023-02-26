import { Router } from "express"
import { userGraphqlController } from '../controllers/user.graphql.controller.js'

const router = Router()

router.get('/', userGraphqlController())
router.post('/', userGraphqlController())
router.delete('/', userGraphqlController())

export {router as graphiqlRouter}