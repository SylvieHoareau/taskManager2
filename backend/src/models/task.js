import mongoose from "mongoose";

const taskSchema = new mongoose.Schema( {
    Task : {
        type:String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User',
    },
},
{
    // Pour afficher la date de création et la date de mise à jour
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;