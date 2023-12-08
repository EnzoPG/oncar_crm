import { Router, Application } from "express";

import adminRoutes from "./admin.routes";
import carRoutes from "./car.routes";
import leadRoutes from "./lead.routes";

const routes = (app: Application): void => {
  const Routes = Router();
  const routePrefix = process.env.NODE_ENV === "production" ? "/" : "/development/";
  app.use(routePrefix, Routes);

  Routes.use("/admin", adminRoutes);
  Routes.use("/car", carRoutes);
  Routes.use("/lead", leadRoutes);
};

export default routes;
