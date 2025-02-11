import { User } from "../models/User.js"
import apiErrors from "../classes/apiErrors.js"
import jwt from "jsonwebtoken"

const userController = {
    
    create: async (req, res) => {
        try{
            const user = await User.create(req.body)
            res.status(201).json({ msg: "usuario criado com sucesso!"});
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
        }
    },

    list: async (req, res) => {
        let userList = await User.find({});
        try{
            if(userList.length === 0) throw new apiErrors("não existem usuarios cadastrados", 404);
            return res.json(userList);
        } catch (error){
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
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
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
        }
    },

    listOneToken: async (req, res) => {
        verifyJWT(req, res)
        const id = req.params.id;
        let user = await User.findById(id).lean();
        try{
            if(!user) throw new apiErrors("id não encontrado", 404);
            delete user.password
            return res.json(user);
        } catch (error){
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        let user = await User.findByIdAndUpdate(id, req.body);
        try{
            if(!user) throw new apiErrors("id não encontrado", 404);
            res.status(200).json({ msg: "usuario atualizado"});
        } catch (error){
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        let user = await User.findByIdAndDelete(id);
        try{
            if(!user) throw new apiErrors("id não encontrado", 404);
            res.status(200).json({ msg: "usuario removido com sucesso"});
        } catch (error){
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
        }    
    },

    login: async (req, res, next) => {
        try{
            const email = req.body.email
            const password = req.body.password
            const foundUser = await User.find({email: email})
            if(!foundUser) throw new apiErrors("email ou senha inválidos (1)", 401);
            if(password !== foundUser[0]?.password) throw new apiErrors("email ou senha inválidos (2)", 401);
            const id = foundUser.id
            const token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 3000 // expires in 5min
            });
            return res.json({ auth: true, token: token });
        } catch (error){
            res.status(error.statusCode || 500).json({ message: `${error.message}` });
        }
    }
}

function verifyJWT(req, res){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        try{
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        } catch (error) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
        }
      console.log("deu bom")
    });
}


export default userController;