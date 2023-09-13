import mongoose from "mongoose";

const taskSchema = new mongoose.Schema( {
    Task : {
        type:String,
        required: true,
    },
    completed: {
        type: Boolean,
        deafult: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User',
    },
},
{
    timestamps: true,
});

const Task = mongoose.model('Task', todoTaskSchema);

export default Task;