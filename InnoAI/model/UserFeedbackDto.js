export class UserFeedbackDto {
    goods;
    bads;
    rating;

    constructor(goods, bads, rating) {
        this.goods = goods || [];
        this.bads = bads || [];
        this.rating = rating || undefined;
    }

    toString() {
        return `Хорошие стороны: ${this.goods
            .map((e) => e.toString())
            .join(', ')}
        Плохие стороны: ${this.bads.map((e) => e.toString()).join(', ')}
        Оценка от сотрудника(максимум 5): ${
            this.rating ? this.rating : 'не поставлено'
        }`;
    }
}
