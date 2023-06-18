import express from "express";
import { createOneService, deleteOneService, getOneService, getServicesByUser, updateOneService, getService, routeIsNotFound } from "../service/service.sevice.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { hasGoodParams } from "../middleware/hasGoodParams.middlewar.js";

const router = express.Router()

router.get('/services', getService);
router.get('/services/user', authMiddleWare, getServicesByUser)
router.get('/services/:id', authMiddleWare, hasGoodParams, getOneService)
router.post('/services', authMiddleWare, createOneService)
router.patch('/services/:id', authMiddleWare, hasGoodParams, updateOneService)
router.delete('/services/:id', authMiddleWare, hasGoodParams, deleteOneService)
router.get('/*', routeIsNotFound)

export default router
