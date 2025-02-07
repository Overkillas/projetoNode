import { User } from "../models/User.js"
import apiErrors from "../classes/apiErrors.js"

const userController = {
    
    create: async (req, res) => {
        try{
            const user = await User.create(req.body)
            res.status(201).json({ msg: "usuario criado com sucesso!"});
        } catch (error) {
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    },

    list: async (req, res) => {
        let userList = await User.find({});
        try{
            if(userList.length === 0) throw new apiErrors("não existem usuarios cadastrados", 404);
            return res.json(userList);
        } catch (error){
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    },

    listOne: async (req, res) => {
        const id = req.params.id;
        let user = await User.findById(id).lean();
        try{
            if(!user) throw new apiErrors("id não encontrado", 404);
            delete user.password
            return res.json(user);
        } catch (error){
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        let user = await User.findByIdAndUpdate(id, req.body);
        try{
            if(!user) throw new apiErrors("id não encontrado", 404);
            res.status(200).json({ msg: "usuario atualizado"});
        } catch (error){
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        let user = await User.findByIdAndDelete(id);
        try{
            if(!user) throw new apiErrors("id não encontrado", 404);
            res.status(200).json({ msg: "usuario removido com sucesso"});
        } catch (error){
            res.status(error.statusCode).json({ message: `${error.message}` });
        }
    
    }
}

export default userController;