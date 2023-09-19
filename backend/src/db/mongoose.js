import mongoose from 'mongoose';

// Connexion à la base de données

const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        depreciationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // Envoyer un ping pour confirmer que la connexion a réussi
        // await client.db("admin").command({ping: 1});
        // console.log("Ping ! Vous êtes connecté(e) à MongoDB !");

        // Test insertion de données dans la BDD

        const db = client.db('todolist');
        const coll = db.collection('tasks');

        const tasks = [
            { 
                Task: 'apprendre MongoDB', 
                completed: true,
                owner: 'sylvie',
            }, 
            { 
                Task: 'apprendre Node JS', 
                completed: true,
                owner: 'sandrine',
            },
            { 
                Task: 'apprendre Vue JS', 
                completed: false,
                owner: 'sylvie',
            },
        ];

        const result = await coll.insertMany(docs);

        // Afficher le résultat
        console.log(result.insertedIds);
    } finally {
        // S'assurer que la connexion se ferme
        await client.close();
        
    }
}

run().catch(console.dir);

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });

