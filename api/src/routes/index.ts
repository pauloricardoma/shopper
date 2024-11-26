import { Router } from "express";
import { RideController } from "../controllers/ride.controller";

export class Routes {
  public routes: Router

  constructor() {
    this.routes = Router()
    this.rideRoutes()
  }

  private rideRoutes() {
    const rideController = new RideController()
    this.routes.post('/ride/estimate', rideController.estimate)
    this.routes.patch('/ride/confirm', rideController.confirm)
    this.routes.get('/ride/:customer_id', rideController.get)
  }
}
