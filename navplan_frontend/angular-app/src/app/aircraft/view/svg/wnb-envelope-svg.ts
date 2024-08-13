import {SvgElement} from '../../../common/svg/svg-element';
import {WnbEnvelope} from '../../domain/model/wnb-envelope';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {WnbEnvelopeContourSvg} from './wnb-envelope-contour-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WnbEnvelopeCoordinate} from '../../domain/model/wnb-envelope-coordinate';
import {WnbEnvelopeDotSvg} from './wnb-envelope-dot-svg';


export class WnbEnvelopeSvg {
    private static readonly BORDER_FACTOR = 0.10;

    public static create(
        envelope: WnbEnvelope,
        zeroFuelWnbCoordinate: WnbEnvelopeCoordinate,
        takeoffWnbCoordinate: WnbEnvelopeCoordinate,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = this.calcImgDimensions(
            envelope,
            zeroFuelWnbCoordinate,
            takeoffWnbCoordinate,
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
        svg.appendChild(WnbEnvelopeDotSvg.create(zeroFuelWnbCoordinate, imgDim, 'Zero Fuel', false));
        svg.appendChild(WnbEnvelopeDotSvg.create(takeoffWnbCoordinate, imgDim, 'Takeoff', true));

        return svg;
    }


    private static calcImgDimensions(
        envelope: WnbEnvelope,
        zeroFuelWnbCoordinate: WnbEnvelopeCoordinate,
        takeoffWnbCoordinate: WnbEnvelopeCoordinate,
        imageWidthPx: number,
        imageHeightPx: number
    ): WnbImageDimensionsSvg {
        const minArmM = Math.min(envelope.getMinArm().m, zeroFuelWnbCoordinate.armCg.m, takeoffWnbCoordinate.armCg.m);
        const maxArmM = Math.max(envelope.getMaxArm().m, zeroFuelWnbCoordinate.armCg.m, takeoffWnbCoordinate.armCg.m);
        const diffArmM = maxArmM - minArmM;
        const minEnvArm = new Length(minArmM - diffArmM * this.BORDER_FACTOR, LengthUnit.M);
        const maxEnvArm = new Length(maxArmM + diffArmM * this.BORDER_FACTOR, LengthUnit.M);
        const minWeightKg = Math.min(envelope.getMinWeight().kg, zeroFuelWnbCoordinate.weight.kg, zeroFuelWnbCoordinate.weight.kg);
        const maxWeightKg = Math.max(envelope.getMaxWeight().kg, zeroFuelWnbCoordinate.weight.kg, zeroFuelWnbCoordinate.weight.kg);
        const diffWeightKg = maxWeightKg - minWeightKg;
        const minEnvWeight = new Weight(minWeightKg - diffWeightKg * this.BORDER_FACTOR, WeightUnit.KG);
        const maxEnvWeight = new Weight(maxWeightKg + diffWeightKg * this.BORDER_FACTOR, WeightUnit.KG)

        return new WnbImageDimensionsSvg(
            minEnvArm,
            maxEnvArm,
            minEnvWeight,
            maxEnvWeight,
            imageWidthPx,
            imageHeightPx
        );
    }
}
