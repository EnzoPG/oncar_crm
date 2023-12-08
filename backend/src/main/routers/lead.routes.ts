import { Router } from "express";
import { makeCreateLeadController, makeGetUserScoreController } from "@/main/factories";
import { adaptRoute } from "@/main/adapters/express-route-adapter";

const leadRoutes = Router();

leadRoutes.post("/generate-score", adaptRoute(makeCreateLeadController()));
leadRoutes.get("/get-score/:id", adaptRoute(makeGetUserScoreController()));

export default leadRoutes;
