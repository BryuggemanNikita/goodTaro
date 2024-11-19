import express from 'express';
import { Request, Response } from 'express';

export const engineEndpoint = express.Router({ caseSensitive: true });

engineEndpoint.get('', (req: Request, res: Response) => {
    res.redirect('/api_goodArcan/source');
});

engineEndpoint.get('/source', (req: Request, res: Response) => {
    res.render('index', { title: 'taro_api', name: 'Hello naimix' });
});
