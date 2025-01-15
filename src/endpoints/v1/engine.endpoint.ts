import express from 'express';
import { Request, Response } from 'express';

export const engineEndpoint = express.Router({ caseSensitive: true });

engineEndpoint.get('', (req: Request, res: Response) => {
    res.redirect('/api_goodArcan/table');
});

engineEndpoint.get('/auth', (req: Request, res: Response) => {
    res.render('auth', { title: 'taro_api', name: 'Hello naimix' });
});

engineEndpoint.get('/table', (req: Request, res: Response) => {
    res.render('table');
});
