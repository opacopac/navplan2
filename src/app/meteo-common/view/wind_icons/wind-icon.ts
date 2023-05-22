import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {environment} from '../../../../environments/environment';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {AngleUnit} from '../../../geo-physics/domain/model/quantities/angle-unit';


export class WindIcon {
    public static ICON_HEIGHT = 34;
    public static ICON_WIDTH = 34;


    public constructor(
        public src: string,
        public rot: Angle
    ) {
    }


    public static createFrom(
        windSpeed: Speed,
        windDir: Angle,
        screenRotation: Angle = Angle.createZero()
    ): WindIcon {
        let src = environment.iconBaseUrl;
        let rot = windDir ? new Angle(windDir.deg + 90 + screenRotation.deg, AngleUnit.DEG) : Angle.createZero();
        const windRangesKt = [[0, '0'], [2, '1-2'], [7, '5'], [12, '10'], [17, '15'], [22, '20'], [27, '25'], [32, '30'],
            [37, '35'], [42, '40'], [47, '45'], [55, '50'], [65, '60'], [75, '70'], [85, '80'], [95, '90'], [105, '100']];


        for (let i = 0; i < windRangesKt.length; i++) {
            if (windSpeed.kt <= windRangesKt[i][0]) {
                src += 'wind_' + windRangesKt[i][1] + 'kt.svg';
                if (i === 0) {
                    rot = Angle.createZero();
                }

                break;
            }
        }

        if (!src) {
            return null; // TODO
        }

        return new WindIcon(src, rot);
    }
}
