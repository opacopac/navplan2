import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {ImageTimeSpeedDimensionsSvg} from '../../../common/svg/image-time-speed-dimensions-svg';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';


export class SpeedProfileAxisSvg {
    public static create(imgDim: ImageTimeSpeedDimensionsSvg, speedUnit: SpeedUnit): SVGGElement {
        const svg = SvgGroupElement.create();
        const speedMarks = AxisHelperSvg.calculateNiceDecimalScaleMarks(
            imgDim.minSpeed.getValue(speedUnit),
            imgDim.maxSpeed.getValue(speedUnit),
            8
        );

        speedMarks.forEach(speedMark => {
            const speed = new Speed(speedMark, speedUnit);
            const pointY = imgDim.calcY(speed);
            svg.appendChild(this.createAxisTick(pointY, imgDim.imageWidthPx, true));

            const label = speed.getValueAndUnit(speedUnit, 0);
            svg.appendChild(this.createGridLabel(pointY, imgDim.imageWidthPx, label));
        });

        return svg;
    }


    private static createAxisTick(y: number, axisXPos: number, isDashed: boolean): SVGLineElement {
        return SvgLineBuilder.builder()
            .setX1(axisXPos - 20)
            .setX2(axisXPos)
            .setY1(y)
            .setY2(y)
            .setStrokeStyle('orange', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .build();
    }


    private static createGridLabel(y: number, axisXPos: number, text: string): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX(axisXPos - 5)
            .setY(y)
            .setStyle('fill:orange; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('end')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('12px')
            .setFontWeight('normal')
            .setTransform('translate(0, -5)')
            .build();
    }
}
