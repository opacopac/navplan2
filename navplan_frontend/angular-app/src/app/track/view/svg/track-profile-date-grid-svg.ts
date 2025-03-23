import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {TrackProfile} from '../../domain/model/track-profile';
import {DatetimeHelper} from '../../../system/domain/service/datetime/datetime-helper';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class TrackProfileDateGridSvg {
    public static create(trackProfile: TrackProfile, imgDim: ImageTimeLengthDimensionsSvg): SVGGElement {
        const svg = SvgGroupElement.create();
        const dateMarks = TrackProfileDateGridSvg.calculate5MinuteMarks(trackProfile.getFirstDate(), trackProfile.getLastDate());

        dateMarks.forEach(mark => {
            const point = imgDim.calcXy(mark, Length.ofZero());
            svg.appendChild(this.createGridLine(point[0], true));

            const label = DatetimeHelper.getHourMinStringFromDate(mark);
            svg.appendChild(this.createGridLabel(point[0], label));
        });

        return svg;
    }


    private static calculate5MinuteMarks(minDate: Date, maxDate: Date): Date[] {
        const dateMarks: Date[] = [];
        const startMark = new Date(minDate);
        startMark.setMinutes(Math.ceil(minDate.getMinutes() / 5) * 5);
        startMark.setSeconds(0);
        startMark.setMilliseconds(0);

        let mark = startMark;
        while (mark < maxDate) {
            dateMarks.push(mark);
            mark = new Date(mark.getTime() + 5 * 60 * 1000);
        }

        return dateMarks;
    }


    private static createGridLine(x: number, isDashed: boolean): SVGLineElement {
        return SvgLineBuilder.builder()
            .setX1(x)
            .setX2(x)
            .setY1Percent(0)
            .setY2Percent(100)
            .setStrokeStyle('#455a64', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .setStrokeDashArray(isDashed ? '1, 2' : undefined)
            .build();
    }


    private static createGridLabel(x: number, text: string): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX(x)
            .setY('100%')
            .setStyle('fill:#455a64; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('12px')
            .setFontWeight('normal')
            .setTransform('translate(5, -5)')
            .build();
    }
}
