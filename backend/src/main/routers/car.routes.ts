import { Router } from "express";
import {
  makeCreateCarController,
  makeUpdateCarController,
  makeGetAllCarsController,
  makeGetByIdCarController,
  makeDeleteCarController,
} from "@/main/factories";
import { authenticate } from "../middleware";
import { adaptRoute } from "@/main/adapters/express-route-adapter";

const carRoutes = Router();

carRoutes.post("/create", authenticate, adaptRoute(makeCreateCarController()));
carRoutes.put("/update/:id", authenticate, adaptRoute(makeUpdateCarController()));
carRoutes.delete("/delete/:id", authenticate, adaptRoute(makeDeleteCarController()));
carRoutes.get("/get-all", adaptRoute(makeGetAllCarsController()));
carRoutes.post("/get-by-id", adaptRoute(makeGetByIdCarController()));

export default carRoutes;
