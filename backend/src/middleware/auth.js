import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne( {
            _id: decodeURI._id,
            "tokens.token": token,
        });
        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        // next() est une fonction de middleware
        // Permet de passer le contrôle à la fonction de middleware suivante après la vérification du jeton JWT
        next();
    } catch (error) {
        res.status(403).send({
            error: 'Accès non autorisé. Authentifiez-vous.'
        });
    }
};

export default auth;