import express from "express";
import gameController from "../src/controllers/gameController.js"

const routes = express.Router();

routes.get("/game", gameController.list);
routes.get("/game/:id", gameController.listOne);
routes.post("/game", gameController.create);
routes.put("/game/:id", gameController.update);
routes.delete("/game/:id", gameController.remove);

export default routes;