import { Game } from "../models/Game.js";
import apiErrors from "../classes/apiErrors.js";

const gameController = {

    list: async (req, res) => {
        let gameList = await Game.find({});
        try{
            if(gameList.length === 0) throw new apiErrors("Não existem jogos no banco de dados", 400);
            return res.json(gameList);
        } catch (error) {
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    },

    listOne: async (req, res) => {
        const id = req.params.id;
        const game = await Game.findById(id);
        try{            
            if(!game) throw new apiErrors("id não encontrado", 404);
            return res.json(game);
        } catch (error) {
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    },

    create: async (req, res) => {
        try{
            const game = await Game.create(req.body);
            res.status(201).json({ msg: "produto adicionado com sucesso!"});
        } catch (error) {
            res.status(400).json({ message: `${error.message}`});
        }
        //testar erro
    },

    update: async (req, res) => {
        const id = req.params.id;
        const game = await Game.findByIdAndUpdate(id, req.body);
        try{    
            if(!game) throw new apiErrors("id não encontrado", 404);
            res.status(200).json({ msg: "produto atualizado"});
        } catch (error) {
            res.status(error.statusCode).json({ message: `${error.message}` });
        }

    },

    remove: async (req, res) => {
        const id = req.params.id;
        const game = await Game.findByIdAndDelete(id);
        try{    
            if(!game) throw new apiErrors("id não encontrado", 404);
            res.status(200).json({ msg: "produto removido com sucesso"});

        } catch (error) {
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    }
}

export default gameController;