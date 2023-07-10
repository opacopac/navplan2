import {SvgRectangleElement} from '../../../common/svg/svg-rectangle-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {VerticalCloudColumn} from '../../../meteo-dwd/domain/model/vertical-cloud-column';


export class VerticalCloudsSvg {
    public static create(verticalCloudColumns: VerticalCloudColumn[], imgDim: ImageDimensionsSvg): SVGElement {
        const svg = SvgGroupElement.create();

        for (let i = 0; i < verticalCloudColumns.length - 1; i++) {
            let lastHeight = new Length(30000, LengthUnit.FT); // TODO

            for (const cloudLevel of verticalCloudColumns[i].cloudLevels) {
                if (cloudLevel.cloudPercent > 0) {
                    const color = this.getCloudColor(cloudLevel.cloudPercent);
                    const style = 'fill:' + color + ';stroke-width:0';
                    const xy0 = imgDim.calcXy(verticalCloudColumns[i].horDist, lastHeight);
                    const xy1 = imgDim.calcXy(verticalCloudColumns[i + 1].horDist, cloudLevel.alt.getHeightAmsl());
                    const width = (xy1[0] - xy0[0]) + '';
                    const height = (xy1[1] - xy0[1]) + '';
                    const cloudRect = SvgRectangleElement.create(xy0[0] + '', xy0[1] + '', width, height, style);
                    svg.appendChild(cloudRect);
                }

                lastHeight = cloudLevel.alt.getHeightAmsl();
            }
        }

        return svg;
    }


    private static getCloudColor(cloudPercent: number): string {
        if (cloudPercent < 5) {
            return 'rgba(0, 0, 0, 0.0)';
        } else if (cloudPercent < 20) {
            return 'rgba(255, 255, 255, 0.3)';
        } else if (cloudPercent < 40) {
            return 'rgba(196, 196, 196, 0.4)';
        } else if (cloudPercent < 50) {
            return 'rgba(128, 128, 128, 0.5)';
        } else if (cloudPercent < 60) {
            return 'rgba(128, 128, 128, 0.5)';
        } else if (cloudPercent < 70) {
            return 'rgba(128, 128, 128, 0.7)';
        } else if (cloudPercent < 80) {
            return 'rgba(128, 128, 128, 0.7)';
        } else if (cloudPercent < 90) {
            return 'rgba(128, 128, 128, 0.9)';
        } else {
            return 'rgba(128, 128, 128, 0.9)';
        }
    }
}
