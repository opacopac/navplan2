export class ArrayService {
    constructor() {
    }


    public static pushUnique(itemList, item) {
        if (itemList.indexOf(item) === - 1) {
            itemList.push(item);
        }
    }


    public static removeFromArray(array, value) {
        const idx = array.indexOf(value);

        if (idx !== -1) {
            array.splice(idx, 1);
        }

        return array;
    }


    public static insertAt(array, index, value) {
        array.splice(index, 0, value);
    }
}
