import {IRestReportingpoint} from '../model/i-rest-reportingpoint';
import {ReportingPointsAndSectors} from '../../domain/model/reporting-points-and-sectors';
import {RestReportingsectorConverter} from './rest-reportingsector-converter';
import {RestReportingpointConverter} from './rest-reportingpoint-converter';
import {ReportingType} from '../../domain/model/reporting-type';


export class RestReportingPointsAndSectorsConverter {
    public static fromRest(response: IRestReportingpoint[]): ReportingPointsAndSectors {

        return new ReportingPointsAndSectors(
            response
                .filter(rp => rp.type === ReportingType[ReportingType.POINT])
                .map(rp => RestReportingpointConverter.fromRest(rp)),
            response
                .filter(rp => rp.type === ReportingType[ReportingType.SECTOR])
                .map(rp => RestReportingsectorConverter.fromRest(rp))
        );
    }
}
