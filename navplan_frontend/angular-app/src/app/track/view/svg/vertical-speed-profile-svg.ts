import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {ImageTimeSpeedDimensionsSvg} from '../../../common/svg/image-time-speed-dimensions-svg';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';


export class VerticalSpeedProfileSvg {
    public static create(verticalSpeedProfile: [Speed, Date][], imgDim: ImageTimeSpeedDimensionsSvg): SVGElement {
        const g = SvgGroupElement.create();

        for (let i = 1; i < verticalSpeedProfile.length; i++) {
            const lastPoint = verticalSpeedProfile[i - 1];
            const currentPoint = verticalSpeedProfile[i];
            const startXy = imgDim.calcXy(lastPoint[1], lastPoint[0]);
            const endXy = imgDim.calcXy(currentPoint[1], currentPoint[0]);
            const line = SvgLineBuilder.builder()
                .setStartXy(startXy)
                .setEndXy(endXy)
                .setStrokeStyle('red', 1)
                .build();
            g.appendChild(line);

        }

        return g;
    }
}
