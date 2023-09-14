import express from 'express';
import sharp from 'sharp';
import multer from 'multer';
import User from '../models/user.js';
import auth from '../middleware/auth.js';
import { sendWelcomeEmail, sendCancelationEmail } from '../emails/account.js';

// Import du module router
const router = express.Router;

// CREATE - Créer un nouvel utilisateur
router.post('/users', async (req, res) => {
    const user = new User (req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});

// Routes pour Sign In et Sign Out

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials (
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send( {
            user, 
            token,
        });
    } catch (error) {
        res.status(400).send('Erreur : ', error);
    }
});

router.post('/users/logout', auth, async ( req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        // Internal Server Error
        res.status(500).send();
    }
});

router.post('/user/logoutAll', auth, async( req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

/**
 * READ, UPDATE and DELETE operations 
 * */

// READ
router.get('users/me', auth, async (req, res) => {
    res.send( req.user);
});

// UPDATE
router.patch('users/me', auth, async (req, res) => { 
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if( !isValidOperation ) {
        return res.status(401).send({ error: "Mises à jour non validées !"});
    }
    try {
        updates.forEach((update) => ( req.user [update] = req.body[ update]));
        await req.status(201).send(req.user);
    } catch (error) {
        res.status(404).send ( { error} );
    }
});

// DELETE

router.delete('users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send( req.user);
    } catch (error) {
        res.status(500).send( { error: "Erreur : ", error  } );
    }
});

/**
 * FETCHING AVATAR
 * */

const upload = multer( {
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/ )) {
            return cb(new Error('Only images are allowed!'), false);
        }
        cb(undefined, true);
    }, 
});

// Pour importer l'avatar

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp (req.file.buffer)
        .resize ( {width: 200, height: 200})
        .jpeg()
        .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
},
( error, req, res, next ) => {
    res.status(400).send( 
        {error: error.message}
    );
});

// Pour supprimer l'avatar

router.delete('/users/me/avatar', auth, async( req, res) => {
    req.user.avatr = undefined;
    await req.user.save();
    res.send();
});

// Pour afficher l'avatar

router.get('/users/:id/avatar', auth, async( req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error();
        }
        res.set("Content-Type", 'image/jpg');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

export default router;
