import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Task from './task.js';

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number, 
        required: true, 
        validate : {
            validator: (value) => {
                return value >= 0;
            }, 
            message : 'L\'âge doit être supérieur ou égal à zéro',
        },
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            }, 
            message: 'L\adresse email n\'est pas valide',
        },
    },
    password: {
        type: String, 
        required: true, 
        // Password contient au minumum 7 caractères
        minlength: 7,
    },
    tokens: [{
        token: {
            type: String, 
            required: true,
        }
    }], 
    avatar: {
        type: Buffer,
    }, 
    }, {
        timestamps: true,
});

// Lien entre le modèle de tâche et l'authentification de l'utilisateur
userSchema.virtual('tasks', {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});

// Recherche par email

userSchema.statics.findCredentials = async(email, password) => {
    const user = await User.findOne({ email });
    // S'il n'y a pas d'utilisateur
    if (!user) {
        throw new Error("Login immpossible. Voir plus de détails.")
    }
    // Si le mot de passe n'est pas correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Login immpossible. Voir plus de détails.")
    }
    return user;
}

// Générer un token

userSchema.methods.generateAuthToken = async() => {
    const user = this;
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

// Renvoyer les données d'utilisateurs

userSchema.methods.toJSON = () => {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

// Sécuriser le mot de passe avant de l'envoyer
userSchema.pre('save', async(next) => {
    const user = this;
    await Task.deleteMany( {owner: user._id});
    next();
});

const User = mongoose.model('User', userSchema);

export default User;