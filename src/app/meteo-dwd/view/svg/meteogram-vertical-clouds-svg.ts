import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {CloudColumnSvg} from './cloud-column-svg';


export class MeteogramVerticalClouds {
    public static create(steps: CloudMeteogramStep[], imgDim: ImageDimensionsSvg): SVGElement {
        const svg = SvgGroupElement.create();

        for (let i = 0; i < steps.length; i++) {
            CloudColumnSvg.draw(
                svg,
                steps[i].cloudLevels,
                imgDim,
                new Length(i, LengthUnit.M),
                new Length(i + 1, LengthUnit.M)
            );
        }

        return svg;
    }
}
