import {Feature} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {environment} from '../../../environments/environment';
import {GeodesyHelper} from '../../common/geo-math/domain-service/geodesy-helper';
import {Position4d} from '../../common/geo-math/domain-model/geometry/position4d';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';


export class OlOwnPlane extends OlComponentBase {
    private readonly olOwnPlane: Feature;


    constructor(
        lastPositions: Position4d[],
        layer: VectorLayer
    ) {
        super();


        this.olOwnPlane = new Feature();
        this.olOwnPlane.setStyle(this.getStyle(lastPositions));
        this.setPointGeometry(this.olOwnPlane, this.getCurrentPosition(lastPositions));
        layer.getSource().addFeature(this.olOwnPlane);
    }


    public get isSelectable(): boolean {
        return false;
    }


    protected getStyle(lastPositions: Position4d[]) {
        if (!lastPositions || lastPositions.length === 0) {
            return undefined;
        }

        const position = this.getCurrentPosition(lastPositions);
        const rotation = this.getRotation(lastPositions).rad;

        let heighttext = '';
        if (position.hasAltitude() && position.altitude.value > 0) {
            heighttext = Math.round(position.altitude.value).toString() + ' ft'; // TODO: einstellbar
        }

        const icon = environment.iconBaseUrl + 'own_plane.svg';

        return new Style({
            image: new Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                opacity: 1.00,
                rotation: Angle.deg2rad(rotation),
                rotateWithView: true,
                src: icon
            }),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                fill: new Fill({color: '#0000FF'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                text: heighttext,
                offsetX: 0,
                offsetY: 35
            })});
    }


    private getRotation(lastPositions: Position4d[]): Angle {
        if (!lastPositions || lastPositions.length < 2) {
            return Angle.createZero();
        }

        const maxIdx = lastPositions.length - 1;
        return GeodesyHelper.calcBearing(
            lastPositions[maxIdx - 1],
            lastPositions[maxIdx]);
    }


    private getCurrentPosition(lastPositions: Position4d[]): Position4d {
        if (!lastPositions || lastPositions.length === 0) {
            return undefined;
        } else {
            return lastPositions[lastPositions.length - 1];
        }
    }
}
