import { GigaChatClient } from './gigachat/GigaChatClient.js';
import { UserFeedbackDto } from './model/UserFeedbackDto.js';
import { UserInfoDto } from './model/UserInfoDto.js';
import { UserArcanDto } from './model/UserArcanDto.js';

export const go = () => {
    const client = new GigaChatClient();

    const dto1 = new UserArcanDto('Володя', '12.12.1979');
    const dto2 = new UserArcanDto('Петр', '01.12.1997');

    client.getSummaryByUserInfo(dto1, dto2).then((response) => {
        console.log(response.choices[0].message.content);
    });

}
