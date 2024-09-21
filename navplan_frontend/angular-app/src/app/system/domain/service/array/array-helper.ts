export class ArrayHelper {
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


    public static mergeUnique<T>(itemList1: Array<T>, itemList2: Array<T>): Array<T> {
        return Array.from(new Set<T>([...itemList1, ...itemList2]));
    }


    public static findFractionalIndex<T>(
        value: T,
        valueList: T[],
        getValueFn: (length: T) => number
    ): number {
        const numValue = getValueFn(value);

        if (!value || !valueList || valueList.length === 0) {
            throw new Error("Value or value list cannot be empty.");
        }
    
        if (numValue <= getValueFn(valueList[0])) {
            return 0;
        }
    
        if (numValue >= getValueFn(valueList[valueList.length - 1])) {
            return valueList.length - 1;
        }
    
        // Find the two integers between which the value lies
        for (let i = 0; i < valueList.length - 1; i++) {
            const lowerNumValue = getValueFn(valueList[i]);
            const upperNumValue = getValueFn(valueList[i + 1]);
    
            if (numValue >= lowerNumValue && numValue <= upperNumValue) {
                // Perform linear interpolation
                const fraction = (numValue - lowerNumValue) / (upperNumValue - lowerNumValue);
                return i + fraction;
            }
        }
    
        throw new Error("Value is out of bounds or list is not sorted.");
    }
}
