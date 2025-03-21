import {SvgBuilder} from '../../../common/svg/svg-builder';
import {TrackProfile} from '../../domain/model/track-profile';
import {AltitudeProfileSvg} from './altitude-profile-svg';
import {ImageTimePxDimensionsSvg} from '../../../common/svg/image-time-px-dimensions-svg';


export class TrackProfileGraphSvg {
    public static create(
        trackProfile: TrackProfile,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = new ImageTimePxDimensionsSvg(
            trackProfile.offBlockTime,
            trackProfile.onBlockTime,
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
