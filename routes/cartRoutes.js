import express from "express";
import cartController from "../src/controllers/cartController.js"

const routes = express.Router();

routes.post("/cart", cartController.create);
routes.get("/cart", cartController.list);
routes.get("/cart/:id", cartController.listOne);
routes.put("/cart/:id", cartController.update);
routes.delete("/cart/:id", cartController.remove);

export default routes;