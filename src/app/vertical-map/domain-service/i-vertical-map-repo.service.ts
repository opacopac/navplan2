import {Observable} from 'rxjs';
import {VerticalMap} from '../domain-model/vertical-map';


export abstract class IVerticalMapRepoService {
    abstract readVerticalMap(wpPositions: [number, number][]): Observable<VerticalMap>;
}
