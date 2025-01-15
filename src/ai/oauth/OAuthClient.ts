import { v4 as uuidV4 } from 'uuid';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import https from 'https';

dotenv.config();

export class OAuthClient {
    url;
    headers;
    scope;
    token;
    agent;
    createTokenTime: Date;

    constructor() {
        this.url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

        this.agent = new https.Agent({
            rejectUnauthorized: false,
        });

        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: 'Basic ' + process.env.AUTH_TOKEN,
            RqUID: uuidV4(),
        };

        this.scope = 'GIGACHAT_API_PERS';
    }

    async createToken() {
        const resp = await fetch(this.url, {
            method: 'POST',
            // credentials: 'include',
            headers: this.headers,
            agent: this.agent,
            body: new URLSearchParams({
                scope: this.scope,
            }),
        });

        const result = await resp.json();
        this.token = result['access_token'];
        this.createTokenTime = new Date();
        return this.token ? this.token : new Error('Проблема авторизации');
    }

    async getToken() {
        if (!this.token) {
            return await this.createToken();
        }

        const diff = new Date().getTime() - this.createTokenTime.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60) % 60;

        return minutes > 28 ? await this.createToken() : this.token;
    }
}
