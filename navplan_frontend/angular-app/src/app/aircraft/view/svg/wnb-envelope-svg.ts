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
import {WnbWeightGridSvg} from './wnb-weight-grid-svg';
import {WnbArmGridSvg} from './wnb-arm-grid-svg';


export class WnbEnvelopeSvg {
    private static readonly BORDER_FACTOR = 0.10;

    public static create(
        envelope: WnbEnvelope,
        zeroFuelWnbCoordinate: WnbEnvelopeCoordinate,
        takeoffWnbCoordinate: WnbEnvelopeCoordinate,
        weightUnit: WeightUnit,
        lengthUnit: LengthUnit,
        imageWidthPx: number,
        imageHeightPx: number,
        clickCallback: (WnbEnvelopeCoordinate) => void
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
        svg.onclick = ($event) => {
            const coord = this.getClickCoordinates($event, svg, imgDim);
            clickCallback(coord);
        };

        svg.appendChild(WnbEnvelopeContourSvg.create(envelope.coordinates, imgDim));
        svg.appendChild(WnbWeightGridSvg.create(imgDim, weightUnit));
        svg.appendChild(WnbArmGridSvg.create(imgDim, lengthUnit));
        if (zeroFuelWnbCoordinate) {
            svg.appendChild(WnbEnvelopeDotSvg.create(zeroFuelWnbCoordinate, imgDim, 'Zero Fuel', false));
        }
        if (takeoffWnbCoordinate) {
            svg.appendChild(WnbEnvelopeDotSvg.create(takeoffWnbCoordinate, imgDim, 'Takeoff', true));
        }

        return svg;
    }


    private static calcImgDimensions(
        envelope: WnbEnvelope,
        zeroFuelWnbCoordinate: WnbEnvelopeCoordinate,
        takeoffWnbCoordinate: WnbEnvelopeCoordinate,
        imageWidthPx: number,
        imageHeightPx: number
    ): WnbImageDimensionsSvg {
        let minArmM = envelope.getMinArm().m;
        minArmM = zeroFuelWnbCoordinate ? Math.min(minArmM, zeroFuelWnbCoordinate.armCg.m) : minArmM;
        minArmM = takeoffWnbCoordinate ? Math.min(minArmM, takeoffWnbCoordinate.armCg.m) : minArmM;
        let maxArmM = envelope.getMaxArm().m;
        maxArmM = zeroFuelWnbCoordinate ? Math.max(maxArmM, zeroFuelWnbCoordinate.armCg.m) : maxArmM;
        maxArmM = takeoffWnbCoordinate ? Math.max(maxArmM, takeoffWnbCoordinate.armCg.m) : maxArmM;
        const diffArmM = maxArmM - minArmM;
        const minEnvArm = new Length(minArmM - diffArmM * this.BORDER_FACTOR, LengthUnit.M);
        const maxEnvArm = new Length(maxArmM + diffArmM * this.BORDER_FACTOR, LengthUnit.M);

        let minWeightKg = envelope.getMinWeight().kg;
        minWeightKg = zeroFuelWnbCoordinate ? Math.min(minWeightKg, zeroFuelWnbCoordinate.weight.kg) : minWeightKg;
        minWeightKg = takeoffWnbCoordinate ? Math.min(minWeightKg, takeoffWnbCoordinate.weight.kg) : minWeightKg;
        let maxWeightKg = envelope.getMaxWeight().kg;
        maxWeightKg = zeroFuelWnbCoordinate ? Math.max(maxWeightKg, zeroFuelWnbCoordinate.weight.kg) : maxWeightKg;
        maxWeightKg = takeoffWnbCoordinate ? Math.max(maxWeightKg, takeoffWnbCoordinate.weight.kg) : maxWeightKg;
        const diffWeightKg = maxWeightKg - minWeightKg;
        const minEnvWeight = new Weight(minWeightKg - diffWeightKg * this.BORDER_FACTOR, WeightUnit.KG);
        const maxEnvWeight = new Weight(maxWeightKg + diffWeightKg * this.BORDER_FACTOR, WeightUnit.KG);

        return new WnbImageDimensionsSvg(
            minEnvArm,
            maxEnvArm,
            minEnvWeight,
            maxEnvWeight,
            imageWidthPx,
            imageHeightPx
        );
    }


    private static getClickCoordinates(event: MouseEvent, svg: SVGSVGElement, imgDim: WnbImageDimensionsSvg): WnbEnvelopeCoordinate {
        const rect = svg.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const diffArmM = imgDim.maxWidth.m - imgDim.minWidth.m;
        const clickArmM = diffArmM / imgDim.imageWidthPx * x + imgDim.minWidth.m;
        const clickArm = new Length(clickArmM, LengthUnit.M);

        const diffHeightKg = imgDim.maxHeight.kg - imgDim.minHeight.kg;
        const clickWeightKg = imgDim.maxHeight.kg - diffHeightKg / imgDim.imageHeightPx * y;
        const clickWeight = new Weight(clickWeightKg, WeightUnit.KG);

        return new WnbEnvelopeCoordinate(clickWeight, clickArm);
    }
}
