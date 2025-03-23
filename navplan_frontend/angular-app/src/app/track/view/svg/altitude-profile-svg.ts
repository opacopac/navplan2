import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class AltitudeProfileSvg {
    public static create(altitudeProfile: [Length, Date][], imgDim: ImageTimeLengthDimensionsSvg): SVGElement {
        const g = SvgGroupElement.create();

        for (let i = 1; i < altitudeProfile.length; i++) {
            const lastPoint = altitudeProfile[i - 1];
            const currentPoint = altitudeProfile[i];
            const line = SvgLineBuilder.builder()
                .setStartXy(imgDim.calcXy(lastPoint[1], lastPoint[0]))
                .setEndXy(imgDim.calcXy(currentPoint[1], currentPoint[0]))
                .setStrokeStyle('blue', 2)
                .build();
            g.appendChild(line);

        }

        return g;
    }
}
