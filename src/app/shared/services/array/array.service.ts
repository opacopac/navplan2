export class ArrayService {
    public static clear<T>(array: Array<T>) {
        array.splice(0, array.length);
    }


    public static pushUnique<T>(itemList: Array<T>, item: T) {
        if (itemList.indexOf(item) === - 1) {
            itemList.push(item);
        }
    }


    public static removeFromArray<T>(array: Array<T>, value: T) {
        const idx = array.indexOf(value);

        if (idx !== -1) {
            array.splice(idx, 1);
        }

        return array;
    }


    public static insertAt<T>(array: Array<T>, index: number, value: T) {
        array.splice(index, 0, value);
    }
}
