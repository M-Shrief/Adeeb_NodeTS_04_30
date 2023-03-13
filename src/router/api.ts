import { Router } from 'express';
import * as Poet from '../controllers/PoetController';

const api = Router();

api.get('/poets', Poet.index);
api.post('/poet', Poet.post);
api.put('/poet/:id', Poet.update);
api.delete('/poet/:id', Poet.destroy);

export default api;
