import _ from 'lodash'; 
import Todo from '../models/todo.js';


export const createTodo = async (req, res) => {
  try {
    const { toDo, email } = _.get(req, 'body');

    const newTodo = new Todo({
      toDo,
      email,
    }); 
    await newTodo.save();
    res.status(201).json({ message: 'Todo created successfully', newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

export const getTodoById = async (req, res) => {
  try { 
    const todo = await Todo.findById(_.get(req, 'params.id'));
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { toDo, email } = _.get(req, 'body');
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { toDo, email },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(_.get(req, 'params.id'));
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};

export const searchTodos = async (req, res) => {
  try {
    const keyword = _.get(req,'query.keyword');
    console.log({keyword})
    const todos = await Todo.find({
      toDo: { $regex: _.escapeRegExp(keyword), $options: 'i' },
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error searching todos', error });
  }
};
