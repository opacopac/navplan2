import * as ol from 'openlayers';
import {Navaid, NavaidType} from '../model/navaid';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {NavaidIcon} from '../model/navaid-icon';


export class OlNavaid extends OlComponentBase {
    private readonly olFeature: ol.Feature;


    public constructor(
        navaid: Navaid,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(navaid);
        this.olFeature.setStyle(this.createPointStyle(navaid));
        this.setPointGeometry(this.olFeature, navaid.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(navaid: Navaid): ol.style.Style {
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


        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity: 0.9,
                src: src
            })),
            text: new ol.style.Text({
                // textAlign: align,
                // textBaseline: baseline,
                font: 'bold 14px Calibri,sans-serif',
                text: navaid.kuerzel,
                fill: new ol.style.Fill({color: '#451A57'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: textOffsetY
            })
        });
    }
}
