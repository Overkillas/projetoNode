import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    publisher: {type: String, required: true},
    price: {type: Number, required: true}
}, { versionKey: false});

const Game = mongoose.model("games", gameSchema);

export {Game, gameSchema};