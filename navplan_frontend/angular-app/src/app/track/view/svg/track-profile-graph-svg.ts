import {SvgBuilder} from '../../../common/svg/svg-builder';
import {TrackProfile} from '../../domain/model/track-profile';
import {AltitudeProfileSvg} from './altitude-profile-svg';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class TrackProfileGraphSvg {
    public static create(
        trackProfile: TrackProfile,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = new ImageTimeLengthDimensionsSvg(
            trackProfile.offBlockTime,
            trackProfile.onBlockTime,
            Length.ofZero(),
            Length.ofFt(15000), // TODO
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setCssClass('map-terrain-svg')
            .build();
        svg.appendChild(AltitudeProfileSvg.create(trackProfile.altitudeProfile, imgDim));
        /*svg.appendChild(MeteogramTerrainSvg.create(cloudMeteogram.elevation, imgDim));
        svg.appendChild(MeteogramVerticalClouds.create(cloudMeteogram.steps, imgDim));
        svg.appendChild(HeightGridSvg.create(imgDim.maxHeight));
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps, true));*/

        return svg;
    }
}
