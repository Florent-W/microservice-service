import express from "express";
import {
  createOneService,
  deleteOneService,
  getOneService,
  getServicesByUser,
  updateOneService,
  getService,
  routeIsNotFound,
  addOneCommande,
  cancelOneCommande,
} from "../service/service.sevice.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { hasGoodParams } from "../middleware/hasGoodParams.middlewar.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router
  .get("/services", authMiddleWare, getService)
  .get("/services/user", authMiddleWare, getServicesByUser)
  .get("/services/:id", authMiddleWare, hasGoodParams, getOneService)
  .post("/services", authMiddleWare, createOneService)
  .patch("/services/:id", authMiddleWare, hasGoodParams, updateOneService)
  .delete("/services/:id", authMiddleWare, hasGoodParams, deleteOneService)
  .patch("/services/:id/commande", authMiddleWare, addOneCommande)
  .patch("/services/:id/cancel/commande", authMiddleWare, cancelOneCommande)
  .get("*", routeIsNotFound);

export default router;
