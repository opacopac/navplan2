import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {ImageTimeSpeedDimensionsSvg} from '../../../common/svg/image-time-speed-dimensions-svg';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';


export class SpeedProfileSvg {
    public static create(speedProfile: [Speed, Date][], imgDim: ImageTimeSpeedDimensionsSvg): SVGElement {
        const g = SvgGroupElement.create();

        for (let i = 1; i < speedProfile.length; i++) {
            const lastPoint = speedProfile[i - 1];
            const currentPoint = speedProfile[i];
            const line = SvgLineBuilder.builder()
                .setStartXy(imgDim.calcXy(lastPoint[1], lastPoint[0]))
                .setEndXy(imgDim.calcXy(currentPoint[1], currentPoint[0]))
                .setStrokeStyle('orange', 2)
                .build();
            g.appendChild(line);

        }

        return g;
    }
}
