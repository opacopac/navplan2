import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Userpoint} from '../domain-model/userpoint';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OlUserpointIcon} from './ol-userpoint-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlUserPoint extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        userPoint: Userpoint,
        private readonly source: Vector) {

        super();

        this.olFeature = this.createFeature(userPoint);
        this.olFeature.setStyle(this.createPointStyle(userPoint));
        this.setPointGeometry(this.olFeature, userPoint.position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    protected createPointStyle(userPoint: Userpoint): Style {
        const src = OlUserpointIcon.getUrl();

        return new Style({
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                opacity: 0.9,
                src: src
            })),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: userPoint.name,
                fill: new Fill({color: '#0077FF'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
