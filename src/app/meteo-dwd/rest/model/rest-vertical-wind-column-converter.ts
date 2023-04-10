import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import { IRestVerticalWindColumn } from './i-rest-vertical-wind-column';
import { VerticalWindColumn } from '../../domain/model/vertical-wind-column';
import { RestVerticalWindLevelConverter } from './rest-vertical-wind-level-converter';


export class RestVerticalWindColumnConverter {
    public static fromRestList(restVerticalWindColumns: IRestVerticalWindColumn[]): VerticalWindColumn[] {
        return restVerticalWindColumns.map(restVerticalWindColumn => this.fromRest(restVerticalWindColumn));
    }


    public static fromRest(restVerticalWindColumn: IRestVerticalWindColumn): VerticalWindColumn {
        if (restVerticalWindColumn == null) {
            return undefined;
        }

        return new VerticalWindColumn(
            RestLengthConverter.fromRest(restVerticalWindColumn[0]),
            RestVerticalWindLevelConverter.fromRestList(restVerticalWindColumn[1])
        );
    }
}
