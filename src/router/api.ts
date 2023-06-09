import { Router } from 'express';
import * as Poet from '../controllers/PoetController';
import * as Poem from '../controllers/PoemController';
import * as ChosenVerse from '../controllers/ChosenVerseController';
import * as Prose from '../controllers/ProseController';
import * as Order from '../controllers/OrderController';
import * as Partner from '../controllers/PartnerController';

const api = Router();

api.get('/poets', Poet.index);
api.get('/poet/:id', Poet.indexOneWithLiterature);
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

api.get('/proses', Prose.indexWithPoet);
api.get('/proses_random/:size', Prose.indexRandom);
api.get('/prose/:id', Prose.indexOneWithPoet);
api.post('/prose', Prose.post);
api.put('/prose/:id', Prose.update);
api.delete('/prose/:id', Prose.destroy);

api.get('/partner/:id', Partner.partnerInfo);
api.post('/partner/signup', Partner.signup);
api.post('/partner/login', Partner.login);
// api.post('/partner/logout', Partner.logout);

api.get('/order/:name/:phone', Order.getOrder);
api.get('/order/:partner', Order.getPartnerOrder);
api.post('/order/store', Order.post);
api.put('/order/:id', Order.update);
api.delete('/order/:id', Order.destroy);
export default api;
