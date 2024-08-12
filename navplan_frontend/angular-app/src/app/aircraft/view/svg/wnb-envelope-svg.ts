import {SvgElement} from '../../../common/svg/svg-element';
import {WnbEnvelope} from '../../domain/model/wnb-envelope';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';


export class WnbEnvelopeSvg {
    public static create(
        envelope: WnbEnvelope,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const numPoints = envelope.coordinates.length;
        const imgDim = new WnbImageDimensionsSvg(
            envelope.getMinArm(),
            envelope.getMaxArm(),
            envelope.getMinWeight(),
            envelope.getMaxWeight(),
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString(),
            'none',
            'wnb-envelope-svg'
        );

        /*svg.appendChild(MeteogramTerrainSvg.create(cloudMeteogram.elevation, imgDim));
        svg.appendChild(MeteogramVerticalClouds.create(cloudMeteogram.steps, imgDim));
        svg.appendChild(HeightGridSvg.create(imgDim.maxHeight));
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps, true));*/

        return svg;
    }
}
