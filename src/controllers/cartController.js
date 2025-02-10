import { Game } from "../models/Game.js";
import { User } from "../models/User.js";
import { Cart } from "../models/Cart.js";
import apiErrors from "../classes/apiErrors.js";

const cartController = {
  create: async (req, res) => {
    try {
      const { user, games} = req.body;
      if (!user) throw new apiErrors("Usuário deve ser fornecido.", 400);
      const foundUser = await User.findById(user);
      if (!foundUser) throw new apiErrors("Usuário não encontrado.", 400);
      const gamePromises = games.map(async (gameId) => {
        const foundGame = await Game.findById(gameId);
        console.log(foundGame)
        if (!foundGame) throw new apiErrors(`Jogo com ID ${gameId} não encontrado.`, 400)
        return foundGame;
      });
      const foundGames = await Promise.all(gamePromises);
      const cart = new Cart({
        user: foundUser,
        games: foundGames
      });      
      await cart.save();      
      res.status(201).json({ msg: "Carrinho criado com sucesso!", cart });
    } catch (error) {
        res.status(400).json({ message: `${error.message} - falha ao criar carrinho` });
    }
      
  },

  list: async (req, res) => {
    try {
      const carts = await Cart.find({}).populate('user').populate('games');
      if (carts.length === 0) throw new apiErrors("Nenhum carrinho encontrado", 400);
      res.json(carts);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: `${error.message}` });
    }
  },

  listOne: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id).populate("user").populate("games");
      if (!cart) throw new apiErrors("Carrinho não encontrado", 404);
      res.json(cart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: `${error.message}` });
    }
  },

  update: async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cart) throw new apiErrors("Carrinho não encontrado", 404);
      res.status(200).json({ msg: "Carrinho atualizado com sucesso!" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: `${error.message}` });
    }
  },

  remove: async (req, res) => {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      if (!cart) throw new apiErrors("Carrinho não encontrado", 404);
      res.status(200).json({ msg: "Carrinho removido com sucesso!" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: `${error.message}` });
    }
  },
};

export default cartController;