import express from 'express';
import { 
    createComicBook,
    getComicBooks,
    getAllComicBooks,
    updateComicBooks,
    deleteComicBook } from '../Controllers/comicBookController.js';

const comicBookRouter   = express.Router();

comicBookRouter.get('/get',getComicBooks);
comicBookRouter.get('/get-all', getAllComicBooks);
comicBookRouter.post('/create', createComicBook);
comicBookRouter.put('/update',updateComicBooks);
comicBookRouter.delete('/delete',deleteComicBook)

export default comicBookRouter