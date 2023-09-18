import express from 'express';
import dotenv from 'dotenv';
import taskRouter from '../src/routers/taskRouter.js';
import userRouter from '../src/routers/userRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Dans l'application
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Logging the app start

app.use('/static', express.static("public"));

app.use(express.urlencoded({ extended: true}));

// Modèle de vue
app.set("view engine", "ejs");

app.listen(port, () => console.log('Le serveur fonctionne !'));
