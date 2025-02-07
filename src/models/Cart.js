import mongoose from "mongoose"
import { gameSchema } from "./Game.js"
import { userSchema } from "./User.js"


const cartSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    user: userSchema,
    games: [{
        gameSchema
    }]
    //adicionar token

}, {versionKey: false})

const cart = mongoose.model("cart", cartSchema);

export default cart;