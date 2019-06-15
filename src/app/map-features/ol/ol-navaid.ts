import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Navaid, NavaidType} from '../domain/navaid';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {NavaidIcon} from '../domain/navaid-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlNavaid extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        navaid: Navaid,
        private readonly source: Vector) {

        super();

        this.olFeature = this.createFeature(navaid);
        this.olFeature.setStyle(this.createPointStyle(navaid));
        this.setPointGeometry(this.olFeature, navaid.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(navaid: Navaid): Style {
        const src = NavaidIcon.getUrl(navaid.type);
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
