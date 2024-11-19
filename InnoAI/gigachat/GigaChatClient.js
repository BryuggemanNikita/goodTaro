import { OAuthClient } from '../oauth/OAuthClient.js';
import { PromptCollection } from './PromptCollection.js';
import fetch from 'node-fetch';
import https from 'https';

export class GigaChatClient {
    #url;
    #headers;
    #agent;
    #oauth;

    constructor() {
        this.#oauth = new OAuthClient();

        this.#url =
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

        this.#agent = new https.Agent({
            rejectUnauthorized: false,
        });

        this.#headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    async getSummaryByUserInfo(...userInfoDto) {
        const payload = this.#createPayload(
            PromptCollection.userInfoByFeedbacks,
                ...userInfoDto,
        );

        return await this.#fetch(payload);
    }

    async #fetch(payload) {
        const resp = await fetch(this.#url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...this.#headers,
                Authorization: 'Bearer ' + (await this.#oauth.getToken()),
            },
            agent: this.#agent,
            body: JSON.stringify(payload),
        });

        return await resp.json();
    }

    #createPayload(prompt, ...dto) {
        return {
            model: 'GigaChat-Pro',
            messages: [
                {
                    role: 'user',
                    content: prompt + '\n' + dto.map(e => e.toString()).join('\n'),
                },
            ],
            n: 1,
            stream: false,
            max_tokens: 1000,
            repetition_penalty: 1,
            update_interval: 0,
        };
    }
}
