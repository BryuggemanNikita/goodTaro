export class UserArcanDto {
    name;
    arcan;

    constructor(name, arcan) {
        this.name = name || '';
        this.arcan = arcan || '';
    }

    toString() {
        return `Имя: ${this.name}
        Номер аркана: ${this.arcan}\n`
    }
}
