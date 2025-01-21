import express from 'express';
import todoRouter from './todo';

const routes = express.Router();

// Example route
routes.use('/todos',todoRouter)

export default routes;
