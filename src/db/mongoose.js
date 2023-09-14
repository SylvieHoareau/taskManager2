import mongoose from 'mongoose';

// Connexion à la base de données

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

