export function getArcan(birthday: string): number {
    let i = 0;
    let arc = birthday.split('.').reduce((acc, cur) => {
        if (i++ == 2) {
            return acc += stringSumm(cur) * 2
        } else {
            return acc += Number(cur) + stringSumm(cur);
        }
    }, 0)
    while (arc > 21) {
        arc = stringSumm(String(arc))
    }
    return arc
}

function stringSumm(str: string): number {
    return str.split("").reduce((acc, cur) => acc += Number(cur), 0)
}