import {HttpParams} from '@angular/common/http';

export class HttpHelper {
    public static HTTP_OPTIONS_WITH_CREDENTIALS = {withCredentials: true};

    public static HTTP_EMPTY_BODY = {};

    public static mergeParameters(paramsList: HttpParams[]): HttpParams {
        let mergedParams = new HttpParams();

        for (const params of paramsList) {
            params.keys().forEach(key => {
                const values = params.getAll(key);
                values?.forEach(value => {
                    mergedParams = mergedParams.append(key, value);
                });
            });
        }

        return mergedParams;
    }
}
