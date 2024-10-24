import { Router } from "express";
import { customerRoute } from "./controllers/CustomerController";

export const routes = Router();

routes.use(customerRoute);