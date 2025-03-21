import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgBuilder} from '../../../common/svg/svg-builder';
import {TrackProfile} from '../../domain/model/track-profile';


export class TrackProfileGraphSvg {
    public static create(
        trackProfile: TrackProfile,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = new ImageDimensionsSvg(
            Length.ofZero(),
            // new Length(cloudMeteogram.steps.length, LengthUnit.M), // TODO
            new Length(20000, LengthUnit.FT), // TODO
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setCssClass('map-terrain-svg')
            .build();
        /*svg.appendChild(MeteogramTerrainSvg.create(cloudMeteogram.elevation, imgDim));
        svg.appendChild(MeteogramVerticalClouds.create(cloudMeteogram.steps, imgDim));
        svg.appendChild(HeightGridSvg.create(imgDim.maxHeight));
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps, true));*/

        return svg;
    }
}
