import * as ol from 'openlayers';
import {MetarTaf} from '../model/metar-taf';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {environment} from '../../../environments/environment';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';


export class OlMetarWind extends OlComponent {
    private readonly olFeature: ol.Feature;


    public constructor(
        metarTaf: MetarTaf,
        position: Position2d,
        mapRotation: Angle,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(metarTaf);
        this.olFeature.setStyle(this.createPointStyle(metarTaf, mapRotation));
        this.setPointGeometry(this.olFeature, position);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(metarTaf: MetarTaf, mapRotation: Angle): ol.style.Style {
        let src = environment.iconBaseUrl;
        let rot = metarTaf.wind_dir_deg ?
            UnitconversionService.deg2rad(metarTaf.wind_dir_deg + 90) + mapRotation.rad : undefined;
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

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: src
            }))
        });
    }
}
