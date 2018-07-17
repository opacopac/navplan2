import * as ol from 'openlayers';
import {environment} from '../../../environments/environment';
import {Navaid} from '../model/navaid';
import {OlComponent} from '../../shared/ol-component/ol-component';


export class OlNavaid extends OlComponent {
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
        let src = environment.iconBaseUrl;
        let textOffsetY;

        switch (navaid.type) {
            case 'NDB':
                src += 'navaid_ndb.png';
                textOffsetY = 33;
                break;
            case 'VOR-DME':
            case 'DVOR-DME':
                src += 'navaid_vor-dme.png';
                textOffsetY = 20;
                break;
            case 'VOR':
            case 'DVOR':
                src += 'navaid_vor.png';
                textOffsetY = 20;
                break;
            case 'DME':
                src += 'navaid_dme.png';
                textOffsetY = 20;
                break;
            case 'TACAN':
                src += 'navaid_tacan.png';
                textOffsetY = 25;
                break;
            case 'VORTAC':
            case 'DVORTAC':
                src += 'navaid_vortac.png';
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
                scale: 1,
                opacity: 0.75,
                src: src
            })),
            text: new ol.style.Text({
                // textAlign: align,
                // textBaseline: baseline,
                font: 'bold 14px Calibri,sans-serif',
                text: name,
                fill: new ol.style.Fill({color: '#451A57'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: textOffsetY
            })
        });
    }
}
