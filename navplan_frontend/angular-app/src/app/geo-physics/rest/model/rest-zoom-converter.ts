import {HttpParams} from '@angular/common/http';


export class RestZoomConverter {
    public static getUrlParam(zoom: number): HttpParams {
        return new HttpParams()
            .set('zoom', zoom);
    }
}
