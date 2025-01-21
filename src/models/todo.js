import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model('todo', todoSchema);
