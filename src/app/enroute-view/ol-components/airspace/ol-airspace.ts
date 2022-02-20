import {Style} from 'ol/style';
import {Airspace} from '../../../enroute/domain-model/airspace';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';
import {OlAirspaceStyle} from './ol-airspace-style';


export class OlAirspace {
    public static draw(
        airspace: Airspace,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airspace, false);
        olFeature.setStyle(this.createPolygonStyle(airspace));
        olFeature.setGeometry(OlGeometry.fromPolygon(airspace.polygon));
        layer.addFeature(olFeature);
    }


    private static createPolygonStyle(airspace: Airspace): Style {
        switch (airspace.category) {
            case 'CTR':
                return OlAirspaceStyle.CTR;
            case 'A':
                return OlAirspaceStyle.A;
            case 'B':
            case 'C':
            case 'D':
                return OlAirspaceStyle.B_C_D;
            case 'E':
                return OlAirspaceStyle.E;
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return OlAirspaceStyle.D_R_P;
            case 'TMZ':
            case 'RMZ':
            case 'FIZ':
                return OlAirspaceStyle.TMZ_RMZ_FIZ;
            case 'FIR':
            case 'UIR':
                return OlAirspaceStyle.FIR_UIR;
            case 'GLIDING':
            case 'WAVE':
                return OlAirspaceStyle.GLD;
            default:
                return undefined;
        }
    }
}
