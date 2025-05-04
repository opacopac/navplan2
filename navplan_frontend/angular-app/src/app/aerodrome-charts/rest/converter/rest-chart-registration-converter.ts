import {IRestChartRegistration} from '../model/i-rest-chart-registration';
import {ChartRegistration} from '../../domain/model/chart-registration';
import {ChartRegistrationType} from '../../domain/model/chart-registration-type';
import {GeoCoordinateType} from '../../domain/model/geo-coordinate-type';
import {RestXycoordConverter} from '../../../geo-physics/rest/model/rest-xycoord-converter';
import {RestGeocoordinateConverter} from '../../../geo-physics/rest/model/rest-geocoordinate-converter';


export class RestChartRegistrationConverter {
    public static fromRest(restChartReg: IRestChartRegistration): ChartRegistration {
        return new ChartRegistration(
            ChartRegistrationType[restChartReg.registrationType],
            GeoCoordinateType[restChartReg.coordinateType],
            RestXycoordConverter.fromRest(restChartReg.pixelXy1),
            RestGeocoordinateConverter.fromRest(restChartReg.geoCoord1),
            RestXycoordConverter.fromRest(restChartReg.pixelXy2),
            RestGeocoordinateConverter.fromRest(restChartReg.geoCoord2),
            restChartReg.scale
        );
    }


    public static toRest(chartReg: ChartRegistration): IRestChartRegistration {
        return {
            registrationType: ChartRegistrationType[chartReg.registrationType],
            coordinateType: GeoCoordinateType[chartReg.coordinateType],
            pixelXy1: RestXycoordConverter.toRest(chartReg.pixelXy1),
            geoCoord1: RestGeocoordinateConverter.toRest(chartReg.geoCoord1),
            pixelXy2: RestXycoordConverter.toRest(chartReg.pixelXy2),
            geoCoord2: RestGeocoordinateConverter.toRest(chartReg.geoCoord2),
            scale: chartReg.scale
        };
    }
}
