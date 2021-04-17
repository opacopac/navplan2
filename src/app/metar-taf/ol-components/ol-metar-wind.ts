import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Icon, Style} from 'ol/style';
import {MetarTaf} from '../domain-model/metar-taf';
import {environment} from '../../../environments/environment';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {Angle} from '../../geo-math/domain-model/quantities/angle';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlMetarWind extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        private readonly source: Vector) {

        super();

        this.olFeature = this.createFeature(metarTaf);
        this.olFeature.setStyle(this.createPointStyle(metarTaf, mapRotation));
        this.setPointGeometry(this.olFeature, position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(metarTaf: MetarTaf, mapRotation: Angle): Style {
        let src = environment.iconBaseUrl;
        let rot = metarTaf.wind_dir_deg ?
            Angle.deg2rad(metarTaf.wind_dir_deg + 90) + mapRotation.rad : undefined;
        const windrange = [[0, '0'], [2, '1-2'], [7, '5'], [12, '10'], [17, '15'], [22, '20'], [27, '25'], [32, '30'],
            [37, '35'], [42, '40'], [47, '45'], [55, '50'], [65, '60'], [75, '70'], [85, '80'], [95, '90'], [105, '100']];


        for (let i = 0; i < windrange.length; i++) {
            if (metarTaf.wind_speed_kt <= windrange[i][0]) {
                src += 'wind_' + windrange[i][1] + 'kt.svg';

                if (i === 0) {
                    rot = 0;
                }

                break;
            }
        }

        if (!src) {
            return;
        }

        const anchorX = -15 - 17;
        const anchorY = 5 - 17;
        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 17;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 17;

        return new Style({
            image: new Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: IconAnchorUnits.PIXELS,
                anchorYUnits: IconAnchorUnits.PIXELS,
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: src
            }))
        });
    }
}
