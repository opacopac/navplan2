import {SvgElement} from '../../../common/svg/svg-element';
import {WnbEnvelope} from '../../domain/model/wnb-envelope';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {WnbEnvelopeContourSvg} from './wnb-envelope-contour-svg';


export class WnbEnvelopeSvg {
    public static create(
        envelope: WnbEnvelope,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
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

        svg.appendChild(WnbEnvelopeContourSvg.create(envelope.coordinates, imgDim));

        return svg;
    }
}
