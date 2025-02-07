import express from "express"
import games from "./gameRoutes.js"
import users from "./userRoutes.js"
import carts from "./cartRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("projeto teste"));

    app.use(express.json(), games, users, carts);
};

export default routes;
