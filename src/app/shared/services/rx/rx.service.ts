import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export class RxService {
    public static getEternal<T>(value?: T): Observable<T> {
        return new BehaviorSubject<T>(value).asObservable();
    }


    public static getObsOrEternal<T>(observable: Observable<T>, value?: T): Observable<T> {
        if (observable) {
            return observable;
        } else {
            return this.getEternal(value);
        }
    }
}
