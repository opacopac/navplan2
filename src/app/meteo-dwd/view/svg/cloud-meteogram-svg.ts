import {SvgElement} from '../../../common/svg/svg-element';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {MeteogramTerrainSvg} from './meteogram-terrain-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {GridSvg} from './grid-svg';
import {MeteogramVerticalClouds} from './meteogram-vertical-clouds-svg';


export class CloudMeteogramSvg {
    public static create(
        steps: CloudMeteogramStep[],
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = new ImageDimensionsSvg(
            new Length(steps.length, LengthUnit.M), // TODO
            new Length(20000, LengthUnit.FT), // TODO
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString(),
            'none',
            'map-terrain-svg'
        );

        svg.appendChild(MeteogramTerrainSvg.create(new Length(1670, LengthUnit.FT), imgDim)); // TODO
        svg.appendChild(MeteogramVerticalClouds.create(steps, imgDim));
        svg.appendChild(GridSvg.create(imgDim.maxHeight));

        return svg;
    }
}
