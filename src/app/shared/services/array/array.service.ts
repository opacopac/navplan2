export class ArrayService {
    public static insertAt<T>(array: Array<T>, index: number, value: T) {
        array.splice(index, 0, value);
    }


    public static removeAt<T>(array: Array<T>, index: number) {
        if (index !== -1) {
            array.splice(index, 1);
        }

        return array;
    }


    public static removeFromArray<T>(array: Array<T>, value: T) {
        const idx = array.indexOf(value);

        return this.removeAt<T>(array, idx);
    }


    public static clear<T>(array: Array<T>) {
        array.splice(0, array.length);
    }


    public static pushUnique<T>(itemList: Array<T>, item: T) {
        if (itemList.indexOf(item) === - 1) {
            itemList.push(item);
        }
    }
}
