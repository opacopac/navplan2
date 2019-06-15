import {INotamService} from './i-notam-service';
import {Extent2d} from '../../shared/model/geometry/extent2d';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {NotamList} from '../domain/notam-list';


export class ReadNotams {
    public constructor(private notamService: INotamService) {
    }


    private static getNotamStartTimestamp(): number {
        const now = new Date();

        // beginning of today LT (notam timestamps from icao have day granularity...)
        return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000);
    }


    private static getNotamEndTimestamp(): number {
        const now = new Date();

        // end of tomorrow LT
        return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).getTime() / 1000);
    }


    private static getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    private static isTimedOut(ageSec: number): boolean {
        return false;
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<NotamList> {
        return this.notamService.readByExtent(
            extent,
            zoom,
            ReadNotams.getNotamStartTimestamp(),
            ReadNotams.getNotamEndTimestamp()
        );
    }
}
