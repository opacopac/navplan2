import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ArrayService} from "../services/utils/array.service";


export class ObservableArray<T> {
    public readonly items$: Observable<T[]>;
    public readonly itemsSource: BehaviorSubject<T[]>;


    constructor(itemList: T[]) {
        this.itemsSource = new BehaviorSubject<T[]>(itemList)
        this.items$ = this.itemsSource.asObservable();
    }


    public replaceList(itemList: T[]) {
        this.itemsSource.next(itemList);
    }


    public clear() {
        this.itemsSource.next([]);
    }


    public push(item: T) {
        const itemList = this.itemsSource.getValue();
        itemList.push(item);
        this.itemsSource.next(itemList);
    }


    public insert(item: T, index: number) {
        const itemList = this.itemsSource.getValue();
        ArrayService.insertAt(itemList, index, item);
        this.itemsSource.next(itemList);
    }


    public remove(item: T) {
        const itemList = this.itemsSource.getValue();
        ArrayService.removeFromArray(itemList, item);
        this.itemsSource.next(itemList);
    }


    public replace(index: number, item: T) {
        const itemList = this.itemsSource.getValue();
        itemList[index] = item;
        this.itemsSource.next(itemList);
    }


    public indexOf(item: T): number {
        const itemList = this.itemsSource.getValue();
        return itemList.indexOf(item);
    }
}
