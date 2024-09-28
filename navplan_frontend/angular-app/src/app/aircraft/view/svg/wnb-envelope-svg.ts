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
    private static readonly MIN_ARM_FALLBACK = Length.createZero();
    private static readonly MAX_ARM_FALLBACK = new Length(3, LengthUnit.M);
    private static readonly MIN_WEIGHT_FALLBACK = Weight.ofZero();
    private static readonly MAX_WEIGHT_FALLBACK = new Weight(3000, WeightUnit.KG);
    private static readonly DIFF_ARM_FALLBACK_M = 1;
    private static readonly DIFF_WEIGHT_FALLBACK_KG = 1000;

    public static create(
        envelope: WnbEnvelope,
        zeroFuelWnbCoordinate: WnbEnvelopeCoordinate,
        takeoffWnbCoordinate: WnbEnvelopeCoordinate,
        weightUnit: WeightUnit,
        lengthUnit: LengthUnit,
        imageWidthPx: number,
        imageHeightPx: number,
        isEditable: boolean,
        addClickCallback: (WnbEnvelopeCoordinate) => void,
        editClickCallback: (WnbEnvelopeCoordinate) => void
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
        if (addClickCallback) {
            svg.onclick = (event: MouseEvent) => {
                const coord = this.getClickCoordinates(event, svg, imgDim);
                addClickCallback(coord);
            };
        }

        if (envelope.coordinates.length > 0) {
            svg.appendChild(WnbEnvelopeContourSvg.create(envelope.coordinates, imgDim));
        }
        svg.appendChild(WnbWeightGridSvg.create(imgDim, weightUnit));
        svg.appendChild(WnbArmGridSvg.create(imgDim, lengthUnit));
        if (zeroFuelWnbCoordinate) {
            svg.appendChild(WnbEnvelopeDotSvg.create(zeroFuelWnbCoordinate, imgDim, 'Zero Fuel', false, null));
        }
        if (takeoffWnbCoordinate) {
            svg.appendChild(WnbEnvelopeDotSvg.create(takeoffWnbCoordinate, imgDim, 'Takeoff', true, null));
        }
        if (isEditable) {
            envelope.coordinates.forEach(coord => {
                const label =
                    (envelope.coordinates.indexOf(coord) + 1) + ') '
                    + coord.weight.getValueAndUnit(weightUnit, 0) + ' / '
                    + coord.armCg.getValueAndUnit(lengthUnit, 3);
                svg.appendChild(WnbEnvelopeDotSvg.create(coord, imgDim, label, true, editClickCallback));
            });
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
        const minArmCoordinate = envelope.getMinArm();
        let minArmM = minArmCoordinate ? minArmCoordinate.m : this.MIN_ARM_FALLBACK.m;
        minArmM = zeroFuelWnbCoordinate ? Math.min(minArmM, zeroFuelWnbCoordinate.armCg.m) : minArmM;
        minArmM = takeoffWnbCoordinate ? Math.min(minArmM, takeoffWnbCoordinate.armCg.m) : minArmM;

        const maxArmCoordinate = envelope.getMaxArm();
        let maxArmM = maxArmCoordinate ? maxArmCoordinate.m : this.MAX_ARM_FALLBACK.m;
        maxArmM = zeroFuelWnbCoordinate ? Math.max(maxArmM, zeroFuelWnbCoordinate.armCg.m) : maxArmM;
        maxArmM = takeoffWnbCoordinate ? Math.max(maxArmM, takeoffWnbCoordinate.armCg.m) : maxArmM;

        let diffArmM = maxArmM - minArmM;
        if (diffArmM === 0) {
            diffArmM = this.DIFF_ARM_FALLBACK_M;
        }
        const minEnvArm = new Length(minArmM - diffArmM * this.BORDER_FACTOR, LengthUnit.M);
        const maxEnvArm = new Length(maxArmM + diffArmM * this.BORDER_FACTOR, LengthUnit.M);

        const minWeightCoordinate = envelope.getMinWeight();
        let minWeightKg = minWeightCoordinate ? minWeightCoordinate.kg : this.MIN_WEIGHT_FALLBACK.kg;
        minWeightKg = zeroFuelWnbCoordinate ? Math.min(minWeightKg, zeroFuelWnbCoordinate.weight.kg) : minWeightKg;
        minWeightKg = takeoffWnbCoordinate ? Math.min(minWeightKg, takeoffWnbCoordinate.weight.kg) : minWeightKg;

        const maxWeightCoordinate = envelope.getMaxWeight();
        let maxWeightKg = maxWeightCoordinate ? maxWeightCoordinate.kg : this.MAX_WEIGHT_FALLBACK.kg;
        maxWeightKg = zeroFuelWnbCoordinate ? Math.max(maxWeightKg, zeroFuelWnbCoordinate.weight.kg) : maxWeightKg;
        maxWeightKg = takeoffWnbCoordinate ? Math.max(maxWeightKg, takeoffWnbCoordinate.weight.kg) : maxWeightKg;

        let diffWeightKg = maxWeightKg - minWeightKg;
        if (diffWeightKg === 0) {
            diffWeightKg = this.DIFF_WEIGHT_FALLBACK_KG;
        }
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
