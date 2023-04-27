import {Icon, Style} from 'ol/style';
import {MetarTaf} from '../../domain/model/metar-taf';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {WindIcon} from '../../../meteo-common/view/wind_icons/wind-icon';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';


export class OlMetarWindStyle {
    public static createPointStyle(metarTaf: MetarTaf, mapRotation: Angle): Style {
        const windIcon = WindIcon.createFrom(
            Speed.fromKt(metarTaf.wind_speed_kt),
            Angle.fromDeg(metarTaf.wind_dir_deg),
            mapRotation
        );

        if (!windIcon) {
            return;
        }

        const anchorX = -15 - 17;
        const anchorY = 5 - 17;
        const rot = windIcon.rot.rad;
        const fakeX = anchorX * Math.cos(-rot) - anchorY * Math.sin(-rot) + 17;
        const fakeY = anchorX * Math.sin(-rot) + anchorY * Math.cos(-rot) + 17;

        return new Style({
            image: new Icon(({
                anchor: [fakeX, fakeY],
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotation: rot,
                rotateWithView: false,
                src: windIcon.src
            }))
        });
    }
}
