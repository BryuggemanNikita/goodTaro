export class UserInfoDto {
    name;
    position;
    feedbacks;

    constructor(name, position, feedbacks) {
        this.name = name || '';
        this.position = position || '';
        this.feedbacks = feedbacks || [];
    }

    toString() {
        return `Имя: ${this.name}
        Должность: ${this.position}
        Отзывы по сотруднику: 
        ${this.feedbacks
            .map((e) => e.toString())
            .join('\n')}`;
    }
}
