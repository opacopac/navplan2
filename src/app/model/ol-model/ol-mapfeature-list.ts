import * as ol from 'openlayers';
import { Mapfeatures } from '../mapfeatures';
import { OlReportingPoint } from './ol-reporting-point';
import { OlNavaid } from './ol-navaid';
import { OlAirspace } from './ol-airspace';
import { OlWebcam } from './ol-webcam';
import { OlReportingSector } from './ol-reporting-sector';
import { OlAirport } from './ol-airport';
import { OlUserPoint } from './ol-user-point';


export class OlMapfeatureList {
    public constructor(
        private mapFeatureList: Mapfeatures) {
    }


    public draw(sourceNonRouteItems: ol.source.Vector, sourceRouteItems: ol.source.Vector) {
        // navaids
        for (const navaid of this.mapFeatureList.navaids) {
            const olFeature = new OlNavaid(navaid);
            olFeature.draw(sourceRouteItems);
        }

        // airports
        for (const airport of this.mapFeatureList.airports) {
            const olFeature = new OlAirport(airport);
            olFeature.draw(sourceRouteItems);
        }

        // airspaces
        for (const airspace of this.mapFeatureList.airspaces) {
            const olFeature = new OlAirspace(airspace);
            olFeature.draw(sourceNonRouteItems);
        }

        // reporting points
        for (const repPoint of this.mapFeatureList.reportingpoints) {
            const olFeature = new OlReportingPoint(repPoint);
            olFeature.draw(sourceRouteItems);
        }

        // reporting sector
        for (const repSec of this.mapFeatureList.reportingsectors) {
            const olFeature = new OlReportingSector(repSec);
            olFeature.draw(sourceRouteItems);
        }

        // user points
        for (const userPoint of this.mapFeatureList.userpoints) {
            const olFeature = new OlUserPoint(userPoint);
            olFeature.draw(sourceRouteItems);
        }

        // webcams
        for (const webcam of this.mapFeatureList.webcams) {
            const olFeature = new OlWebcam(webcam);
            olFeature.draw(sourceNonRouteItems);
        }
    }
}
