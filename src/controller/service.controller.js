import express from "express";
import { createOneService, deleteOneService, getOneService, getServicesByUser, updateOneService } from "../service/service.sevice.js";

const router = express.Router()

router.get('/services', getServicesByUser);
router.get('/services/:id', getOneService)
router.post('/services', createOneService)
router.patch('/services/:id', updateOneService)
router.delete('/services/:id', deleteOneService)

export default router
