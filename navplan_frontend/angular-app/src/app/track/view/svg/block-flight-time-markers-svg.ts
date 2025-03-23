import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {TrackProfile} from '../../domain/model/track-profile';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';


export class BlockFlightTimeMarkersSvg {
    public static create(trackProfile: TrackProfile, imgDim: ImageTimeLengthDimensionsSvg): SVGElement {
        const g = SvgGroupElement.create();

        g.appendChild(this.createMarkerLine(imgDim, trackProfile.offBlockTime));
        g.appendChild(this.createMarkerLine(imgDim, trackProfile.takeoffTime));
        g.appendChild(this.createMarkerLine(imgDim, trackProfile.landingTime));
        g.appendChild(this.createMarkerLine(imgDim, trackProfile.onBlockTime));

        return g;
    }


    private static createMarkerLine(imgDim: ImageTimeLengthDimensionsSvg, time: Date): SVGElement {
        return SvgLineBuilder.builder()
            .setStartXy([imgDim.calcX(time), imgDim.imageHeightPx])
            .setEndXy([imgDim.calcX(time), 0])
            .setStrokeStyle('red', 1)
            .setStrokeDashArrayOnOff(5, 5)
            .build();
    }
}
