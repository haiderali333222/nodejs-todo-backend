import express from 'express';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  searchTodos,
} from '../controllers/todo.js';

const router = express.Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.get('/search', searchTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
