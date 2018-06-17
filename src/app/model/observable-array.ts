import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ArrayService} from '../services/utils/array.service';


export class ObservableArray<T> {
    protected readonly itemsSource: BehaviorSubject<T[]>;
    protected readonly beforeNextSource: BehaviorSubject<T[]>;


    constructor(itemList: T[]) {
        this.itemsSource = new BehaviorSubject<T[]>(itemList);
        this.beforeNextSource = new BehaviorSubject<T[]>(undefined);
    }


    get beforeNext$(): Observable<T[]> {
        return this.beforeNextSource.asObservable();
    }


    get items$(): Observable<T[]> {
        return this.itemsSource.asObservable();
    }


    get lastItem$(): Observable<T> {
        return this.items$
            .map(items => (items && items.length > 0) ? items[items.length - 1] : undefined);
    }


    public replaceList(itemList: T[]) {
        this.beforeNextSource.next(itemList);
        this.itemsSource.next(itemList);
    }


    public clear() {
        const itemList = [];
        this.beforeNextSource.next(itemList);
        this.itemsSource.next(itemList);
    }


    public push(item: T) {
        const itemList = this.itemsSource.getValue();

        if (itemList) {
            itemList.push(item);
            this.beforeNextSource.next(itemList);
            this.itemsSource.next(itemList);
        }
    }


    public insert(item: T, index: number) {
        const itemList = this.itemsSource.getValue();

        if (itemList && index >= 0) {
            ArrayService.insertAt(itemList, index, item);
            this.beforeNextSource.next(itemList);
            this.itemsSource.next(itemList);
        }
    }


    public remove(item: T) {
        const itemList = this.itemsSource.getValue();

        if (itemList) {
            ArrayService.removeFromArray(itemList, item);
            this.beforeNextSource.next(itemList);
            this.itemsSource.next(itemList);
        }
    }


    public replace(index: number, item: T) {
        const itemList = this.itemsSource.getValue();

        if (itemList && index >= 0 && index < itemList.length) {
            itemList[index] = item;
            this.beforeNextSource.next(itemList);
            this.itemsSource.next(itemList);
        }
    }


    public reverse() {
        const itemList = this.itemsSource.getValue();

        if (itemList && itemList.length > 1) {
            const reverseItems: T[] = [];
            for (let i = itemList.length - 1; i >= 0; i--) {
                reverseItems.push(itemList[i]);
            }
            this.beforeNextSource.next(reverseItems);
            this.itemsSource.next(reverseItems);
        }
    }


    // TODO
    public indexOf(item: T): number {
        const itemList = this.itemsSource.getValue();
        return itemList.indexOf(item);
    }
}
