import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {TrackProfile} from '../../../track/domain/model/track-profile';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';


export class BlockFlightTimeMarkersSvg {
    public static create(trackProfile: TrackProfile, imgDim: ImageTimeLengthDimensionsSvg): SVGElement {
        const g = SvgGroupElement.create();
        const blockTimeColor = 'green';
        const flightTimeColor = 'blue';

        g.appendChild(this.createMarkerLine(imgDim, trackProfile.offBlockTime, blockTimeColor));
        g.appendChild(this.createMarkerLine(imgDim, trackProfile.takeoffTime, flightTimeColor));
        g.appendChild(this.createMarkerLine(imgDim, trackProfile.landingTime, flightTimeColor));
        g.appendChild(this.createMarkerLine(imgDim, trackProfile.onBlockTime, blockTimeColor));

        return g;
    }


    private static createMarkerLine(imgDim: ImageTimeLengthDimensionsSvg, time: Date, color: string): SVGElement {
        return SvgLineBuilder.builder()
            .setStartXy([imgDim.calcX(time), imgDim.imageHeightPx])
            .setEndXy([imgDim.calcX(time), 0])
            .setStrokeStyle(color, 1)
            .setStrokeDashArrayOnOff(5, 5)
            .build();
    }
}
