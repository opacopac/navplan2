import {IRestVerticalCloudColumn} from './i-rest-vertical-cloud-column';
import {VerticalCloudColumn} from '../../domain/model/vertical-cloud-column';
import {RestVerticalCloudLevelConverter} from './rest-vertical-cloud-level-converter';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';


export class RestVerticalCloudColumnConverter {
    public static fromRestList(restVerticalCloudColumns: IRestVerticalCloudColumn[]): VerticalCloudColumn[] {
        return restVerticalCloudColumns.map(restVerticalCloudColumn => this.fromRest(restVerticalCloudColumn));
    }


    public static fromRest(restVerticalCloudColumn: IRestVerticalCloudColumn): VerticalCloudColumn {
        if (restVerticalCloudColumn == null) {
            return undefined;
        }

        return new VerticalCloudColumn(
            RestLengthConverter.fromRest(restVerticalCloudColumn[0]),
            RestVerticalCloudLevelConverter.fromRestList(restVerticalCloudColumn[1])
        );
    }
}
