import { Router } from "express";
import { RideController } from "../controllers/ride.controller";
import { AuthController } from "../controllers/auth.controller";

export class Routes {
  public routes: Router

  constructor() {
    this.routes = Router()
    this.authRoutes()
    this.rideRoutes()
  }

  private authRoutes() {
    const authController = new AuthController()
    this.routes.post('/auth/login', authController.login)
  }

  private rideRoutes() {
    const rideController = new RideController()
    this.routes.post('/ride/estimate', rideController.estimate)
    this.routes.patch('/ride/confirm', rideController.confirm)
    this.routes.get('/ride/:customer_id', rideController.get)
  }
}
