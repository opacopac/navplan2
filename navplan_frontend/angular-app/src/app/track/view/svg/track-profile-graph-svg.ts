import {SvgBuilder} from '../../../common/svg/svg-builder';
import {TrackProfile} from '../../domain/model/track-profile';
import {AltitudeProfileSvg} from './altitude-profile-svg';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageTimeSpeedDimensionsSvg} from '../../../common/svg/image-time-speed-dimensions-svg';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {SpeedProfileSvg} from './speed-profile-svg';
import {BlockFlightTimeMarkersSvg} from './block-flight-time-markers-svg';
import {TrackProfileDateGridSvg} from './track-profile-date-grid-svg';
import {VerticalSpeedProfileSvg} from './vertical-speed-profile-svg';
import {DistanceProfileSvg} from './distance-profile-svg';


export class TrackProfileGraphSvg {
    public static create(
        trackProfile: TrackProfile,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDimAltProfile = new ImageTimeLengthDimensionsSvg(
            trackProfile.getFirstDate(),
            trackProfile.getLastDate(),
            Length.ofZero(),
            Length.ofFt(15000), // TODO
            imageWidthPx,
            imageHeightPx
        );
        const imgDimDistProfile = new ImageTimeLengthDimensionsSvg(
            trackProfile.getFirstDate(),
            trackProfile.getLastDate(),
            Length.ofZero(),
            trackProfile.distanceProfile[trackProfile.distanceProfile.length - 1][0],
            imageWidthPx,
            imageHeightPx
        );
        const imgDimSpeedProfile = new ImageTimeSpeedDimensionsSvg(
            trackProfile.getFirstDate(),
            trackProfile.getLastDate(),
            Speed.ofZero(),
            Speed.ofKt(150), // TODO
            imageWidthPx,
            imageHeightPx
        );
        const imgDimVerticalSpeedProfile = new ImageTimeSpeedDimensionsSvg(
            trackProfile.getFirstDate(),
            trackProfile.getLastDate(),
            Speed.ofFpm(-2000), // TODO
            Speed.ofFpm(2000), // TODO
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setCssClass('map-terrain-svg')
            .build();
        svg.appendChild(VerticalSpeedProfileSvg.create(trackProfile.verticalSpeedProfile, imgDimVerticalSpeedProfile));
        svg.appendChild(SpeedProfileSvg.create(trackProfile.speedProfile, imgDimSpeedProfile));
        svg.appendChild(DistanceProfileSvg.create(trackProfile.distanceProfile, imgDimDistProfile));
        svg.appendChild(AltitudeProfileSvg.create(trackProfile.altitudeProfile, imgDimAltProfile));
        svg.appendChild(BlockFlightTimeMarkersSvg.create(trackProfile, imgDimAltProfile));
        svg.appendChild(TrackProfileDateGridSvg.create(trackProfile, imgDimAltProfile));

        return svg;
    }
}
