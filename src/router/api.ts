import { Router } from 'express';
import * as Poet from '../controllers/PoetController';
import * as Poem from '../controllers/PoemController';
const api = Router();

api.get('/poets', Poet.index);
api.post('/poet', Poet.post);
api.put('/poet/:id', Poet.update);
api.delete('/poet/:id', Poet.destroy);

api.get('/poems', Poem.indexWithPoet);
api.get('/poems_intros', Poem.indexIntrosWithPoetName);
api.get('/poem/:id', Poem.indexOneWithPoet);
api.post('/poem', Poem.post);
api.put('/poem/:id', Poem.update);
api.delete('/poem/:id', Poem.destroy);

export default api;
