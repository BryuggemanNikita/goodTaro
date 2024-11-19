export class UserArcanDto {
    name;
    date;

    constructor(name, date) {
        this.name = name || '';
        this.date = date || '';
    }

    toString() {
        return `Имя: ${this.name}
        Дата рождения: ${this.date}\n`
    }
}
