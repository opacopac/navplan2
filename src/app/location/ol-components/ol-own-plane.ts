import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {environment} from '../../../environments/environment';
import {GeodesyHelper} from '../../geo-physics/domain-service/geometry/geodesy-helper';
import {Position4d} from '../../geo-physics/domain-model/geometry/position4d';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';


export class OlOwnPlane {
    public static draw(
        lastPositions: Position4d[],
        layer: OlVectorLayer
    ) {
        const olOwnPlane = new OlFeature(undefined, false);
        olOwnPlane.setStyle(this.getStyle(lastPositions));
        olOwnPlane.setGeometry(OlGeometry.fromPoint(this.getCurrentPosition(lastPositions)));
        layer.addFeature(olOwnPlane);
    }


    private static getStyle(lastPositions: Position4d[]) {
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


    private static getRotation(lastPositions: Position4d[]): Angle {
        if (!lastPositions || lastPositions.length < 2) {
            return Angle.createZero();
        }

        const maxIdx = lastPositions.length - 1;
        return GeodesyHelper.calcBearing(
            lastPositions[maxIdx - 1],
            lastPositions[maxIdx]);
    }


    private static getCurrentPosition(lastPositions: Position4d[]): Position4d {
        if (!lastPositions || lastPositions.length === 0) {
            return undefined;
        } else {
            return lastPositions[lastPositions.length - 1];
        }
    }
}
