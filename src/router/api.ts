import { Router } from 'express';
import * as Poet from '../controllers/PoetController';
import * as Poem from '../controllers/PoemController';
import * as ChosenVerse from '../controllers/ChosenVerseController';
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

api.get('/chosenverses', ChosenVerse.indexWithPoet);
api.get('/chosenverses_random/:size', ChosenVerse.indexRandom);
api.get('/chosenverse/:id', ChosenVerse.indexOneWithPoet);
api.post('/chosenverse', ChosenVerse.post);
api.put('/chosenverse/:id', ChosenVerse.update);
api.delete('/chosenverse/:id', ChosenVerse.destroy);

export default api;
