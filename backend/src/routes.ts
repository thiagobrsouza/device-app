import { Router } from "express";
import { customerRoute } from "./controllers/CustomerController";
import { locationRoute } from "./controllers/LocationController";

export const routes = Router();

routes.use(customerRoute);
routes.use(locationRoute);