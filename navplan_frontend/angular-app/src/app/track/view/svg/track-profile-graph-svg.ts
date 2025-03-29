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
import {AltitudeProfileGridSvg} from './altitude-profile-grid-svg';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {SpeedProfileAxisSvg} from './speed-profile-axis-svg';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {VerticalSpeedProfileSvg} from './vertical-speed-profile-svg';
import {DistanceProfileSvg} from './distance-profile-svg';


export class TrackProfileGraphSvg {
    private static MAX_VALUE_BUFFER_FACTOR = 1.10;

    public static create(
        trackProfile: TrackProfile,
        imageWidthPx: number,
        imageHeightPx: number,
        zoomInClickCallback: (Date) => void,
        zoomOutClickCallback: (Date) => void
    ): SVGSVGElement {
        const imgDimAltProfile = new ImageTimeLengthDimensionsSvg(
            trackProfile.getFirstDate(),
            trackProfile.getLastDate(),
            Length.ofZero(),
            trackProfile.maxAltitude.multiplyBy(this.MAX_VALUE_BUFFER_FACTOR),
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
            trackProfile.maxSpeed.multiplyBy(this.MAX_VALUE_BUFFER_FACTOR),
            imageWidthPx,
            imageHeightPx
        );
        const imgDimVerticalSpeedProfile = new ImageTimeSpeedDimensionsSvg(
            trackProfile.getFirstDate(),
            trackProfile.getLastDate(),
            trackProfile.maxVerticalSpeed.multiplyBy(-this.MAX_VALUE_BUFFER_FACTOR),
            trackProfile.maxVerticalSpeed.multiplyBy(this.MAX_VALUE_BUFFER_FACTOR),
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .build();

        if (zoomInClickCallback && zoomOutClickCallback) {
            svg.onclick = (event: MouseEvent) => {
                const date = this.getClickDate(event, svg, imgDimAltProfile);
                if (event.button === 0) {
                    event.stopPropagation();
                    zoomInClickCallback(date);
                } else if (event.button === 2) {
                    event.stopPropagation();
                    zoomOutClickCallback(date);
                }
            };
        }

        svg.appendChild(VerticalSpeedProfileSvg.create(trackProfile.verticalSpeedProfile, imgDimVerticalSpeedProfile));
        svg.appendChild(SpeedProfileSvg.create(trackProfile.speedProfile, imgDimSpeedProfile));
        svg.appendChild(DistanceProfileSvg.create(trackProfile.distanceProfile, imgDimDistProfile));
        svg.appendChild(AltitudeProfileSvg.create(trackProfile.altitudeProfile, imgDimAltProfile));
        svg.appendChild(BlockFlightTimeMarkersSvg.create(trackProfile, imgDimAltProfile));
        svg.appendChild(TrackProfileDateGridSvg.create(imgDimAltProfile));
        svg.appendChild(AltitudeProfileGridSvg.create(imgDimAltProfile, LengthUnit.FT));
        svg.appendChild(SpeedProfileAxisSvg.create(imgDimSpeedProfile, SpeedUnit.KT));

        return svg;
    }


    private static getClickDate(event: MouseEvent, svg: SVGSVGElement, imgDim: ImageTimeLengthDimensionsSvg): Date {
        const rect = svg.getBoundingClientRect();
        const x = event.clientX - rect.left;

        const diffDateMs = imgDim.maxDate.getTime() - imgDim.minDate.getTime();
        const clickDateMs = diffDateMs / imgDim.imageWidthPx * x + imgDim.minDate.getTime();

        return new Date(clickDateMs);
    }
}
