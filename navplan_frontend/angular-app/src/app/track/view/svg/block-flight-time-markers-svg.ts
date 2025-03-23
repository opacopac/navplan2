import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {TrackProfile} from '../../domain/model/track-profile';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';


export class BlockFlightTimeMarkersSvg {
    public static create(trackProfile: TrackProfile, imgDim: ImageTimeLengthDimensionsSvg): SVGElement {
        const g = SvgGroupElement.create();

        const offBlockTimeMarker = SvgLineBuilder.builder()
            .setStartXy([imgDim.calcX(trackProfile.offBlockTime), imgDim.imageHeightPx])
            .setEndXy([imgDim.calcX(trackProfile.offBlockTime), imgDim.imageHeightPx - 25])
            .setStrokeStyle('red', 2)
            .build();
        const onBlockMarker = SvgLineBuilder.builder()
            .setStartXy([imgDim.calcX(trackProfile.onBlockTime), imgDim.imageHeightPx])
            .setEndXy([imgDim.calcX(trackProfile.onBlockTime), imgDim.imageHeightPx - 25])
            .setStrokeStyle('red', 2)
            .build();
        const takeoffTimeMarker = SvgLineBuilder.builder()
            .setStartXy([imgDim.calcX(trackProfile.takeoffTime), imgDim.imageHeightPx])
            .setEndXy([imgDim.calcX(trackProfile.takeoffTime), imgDim.imageHeightPx - 25])
            .setStrokeStyle('red', 2)
            .build();
        const landingTimeMarker = SvgLineBuilder.builder()
            .setStartXy([imgDim.calcX(trackProfile.landingTime), imgDim.imageHeightPx])
            .setEndXy([imgDim.calcX(trackProfile.landingTime), imgDim.imageHeightPx - 25])
            .setStrokeStyle('red', 2)
            .build();

        g.appendChild(offBlockTimeMarker);
        g.appendChild(takeoffTimeMarker);
        g.appendChild(landingTimeMarker);
        g.appendChild(onBlockMarker);

        return g;
    }
}
