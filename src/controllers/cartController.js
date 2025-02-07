// import Cart from "../models/Cart.js"
// import apiErrors from "../classes/apiErrors.js"
// import { Game } from "../models/Game.js";
// import { User } from "../models/User.js";

// const cartController = {

//     list: async (req, res) => {
//         let cartList = await Cart.find({});
//         try{
//             if(cartList.length === 0) throw new apiErrors("Não existem jogos no banco de dados", 400);
//             return res.json(cartList);
//         } catch (error) {
//             res.status(error.statusCode).json({ message: `${error.message}` });
//         }
//     },

//     listOne: async (req, res) => {
//         const id = req.params.id;
//         const cart = await Cart.findById(id);
//         try{            
//             if(!cart) throw new apiErrors("id não encontrado", 404);
//             return res.json(cart);
//         } catch (error) {
//             res.status(error.statusCode).json({ message: `${error.message}` });
//         }
//     },

//     create: async (req, res) => {
//         const newCart = req.body;
//         const games = [];
//         const foundUser = await User.findById(newCart.user)
//         console.log(newCart)
//         for(let i = 0; i < req.body.games.length; i++){
//             console.log(req.body.games[i])
//             games[i] = await Game.findById(req.body.games[i])
//         }        
//         try{
//             const cart = await Cart.create(req.body);
//             res.status(201).json({ msg: "carrinho criado com sucesso!"});
//         } catch (error) {
//             res.status(400).json({ message: `${error.message}`});
//         }
//         //testar erro
//     },

//     update: async (req, res) => {
//         const id = req.params.id;
//         const cart = await cart.findByIdAndUpdate(id, req.body);
//         try{    
//             if(!cart) throw new apiErrors("id não encontrado", 404);
//             res.status(200).json({ msg: "produto atualizado"});
//         } catch (error) {
//             res.status(error.statusCode).json({ message: `${error.message}` });
//         }

//     },

//     remove: async (req, res) => {
//         const id = req.params.id;
//         const cart = await cart.findByIdAndDelete(id);
//         try{    
//             if(!cart) throw new apiErrors("id não encontrado", 404);
//             res.status(200).json({ msg: "produto removido com sucesso"});

//         } catch (error) {
//             res.status(error.statusCode).json({ message: `${error.message}` });
//         }
//     }
// }

// export default cartController;