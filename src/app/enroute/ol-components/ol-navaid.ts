import {Feature} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Navaid} from '../domain-model/navaid';
import {OlNavaidIcon} from './ol-navaid-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {NavaidType} from '../domain-model/navaid-type';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlNavaid {
    private readonly olFeature: Feature;


    public constructor(
        navaid: Navaid,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(navaid, true);
        this.olFeature.setStyle(this.createPointStyle(navaid));
        this.olFeature.setGeometry(OlHelper.getPointGeometry(navaid.position));
        layer.getSource().addFeature(this.olFeature);
    }


    private createPointStyle(navaid: Navaid): Style {
        const src = OlNavaidIcon.getUrl(navaid.type);
        if (!src) { return undefined; }

        let textOffsetY;
        switch (navaid.type) {
            case NavaidType.NDB:
                textOffsetY = 33;
                break;
            case NavaidType.VOR_DME:
            case NavaidType.DVOR_DME:
                textOffsetY = 22;
                break;
            case NavaidType.VOR:
            case NavaidType.DVOR:
                textOffsetY = 22;
                break;
            case NavaidType.DME:
                textOffsetY = 22;
                break;
            case NavaidType.TACAN:
                textOffsetY = 25;
                break;
            case NavaidType.VORTAC:
            case NavaidType.DVORTAC:
                textOffsetY = 25;
                break;
            default:
                return undefined;
        }


        return new Style({
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                opacity: 0.9,
                src: src
            })),
            text: new Text({
                // textAlign: align,
                // textBaseline: baseline,
                font: 'bold 14px Calibri,sans-serif',
                text: navaid.kuerzel,
                fill: new Fill({color: '#451A57'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: textOffsetY
            })
        });
    }
}
