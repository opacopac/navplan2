import {Style} from 'ol/style';
import {Airspace} from '../../../enroute/domain-model/airspace';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';
import {OlAirspaceStyles} from './ol-airspace-styles';


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
                return OlAirspaceStyles.CTR;
            case 'A':
                return OlAirspaceStyles.A;
            case 'B':
            case 'C':
            case 'D':
                return OlAirspaceStyles.B_C_D;
            case 'E':
                return OlAirspaceStyles.E;
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return OlAirspaceStyles.D_R_P;
            case 'TMZ':
            case 'RMZ':
            case 'FIZ':
                return OlAirspaceStyles.TMZ_RMZ_FIZ;
            case 'FIR':
            case 'UIR':
                return OlAirspaceStyles.FIR_UIR;
            case 'GLIDING':
            case 'WAVE':
                return OlAirspaceStyles.GLD;
            default:
                return undefined;
        }
    }
}
