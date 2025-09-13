import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {VerticalCloudColumn} from '../../../meteo-forecast/domain/model/vertical-cloud-column';
import {CloudColumnSvg} from '../../../meteo-forecast/view/svg/cloud-column-svg';


export class VerticalCloudsSvg {
    public static create(verticalCloudColumns: VerticalCloudColumn[], imgDim: ImageDimensionsSvg): SVGElement {
        const svg = SvgGroupElement.create();

        for (let i = 0; i < verticalCloudColumns.length - 1; i++) {
            CloudColumnSvg.draw(
                svg,
                verticalCloudColumns[i].cloudLevels,
                imgDim,
                verticalCloudColumns[i].horDist,
                verticalCloudColumns[i + 1].horDist
            );
        }

        return svg;
    }
}
