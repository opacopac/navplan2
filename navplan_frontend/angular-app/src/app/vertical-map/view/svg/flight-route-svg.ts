import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgCircleBuilder} from '../../../common/svg/svg-circle-builder';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {VerticalMapWaypointStep} from '../../domain/model/vertical-map-waypoint-step';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class FlightRouteSvg {
    public static create(
        waypointSteps: VerticalMapWaypointStep[],
        imgDim: ImageDimensionsSvg,
        wpClickCallback: (Waypoint) => void
    ): SVGElement {
        const svg = SvgGroupElement.create();
        const yOffset = [40, 80];

        for (let i = 0; i < waypointSteps.length - 1; i++) {
            const horDistPercent = waypointSteps[i].horDist.m / imgDim.maxWidth.m * 100;
            const horDistNextPercent = waypointSteps[i + 1].horDist.m / imgDim.maxWidth.m * 100;

            // line segment
            svg.appendChild(SvgLineBuilder.builder()
                .setX1Percent(horDistPercent)
                .setX2Percent(horDistNextPercent)
                .setY1(yOffset[0].toString())
                .setY2(yOffset[0].toString())
                .setStrokeStyle('rgba(255, 0, 255, 1.0)', 5)
                .setShapeRenderingCrispEdges()
                .build()
            );

            this.addRouteDot(svg, horDistPercent, yOffset[0], waypointSteps[i].waypoint, wpClickCallback);
            this.addRouteDotPlumline(svg, horDistPercent, yOffset[0], imgDim.imageHeightPx);
            this.addWaypointLabel(svg, horDistPercent, yOffset[i % 2], waypointSteps[i].waypoint,
                (i === 0) ? 'start' : 'middle', wpClickCallback);
        }

        // final dot
        const lastWpIdx = waypointSteps.length - 1;
        this.addRouteDot(svg, 100, yOffset[0], waypointSteps[lastWpIdx].waypoint, wpClickCallback);
        this.addRouteDotPlumline(svg, 100, yOffset[0], imgDim.imageHeightPx);
        this.addWaypointLabel(svg, 100, yOffset[lastWpIdx % 2], waypointSteps[lastWpIdx].waypoint,
            'end', wpClickCallback);

        return svg;
    }


    private static addRouteDot(
        svg: SVGElement,
        cxProc: number,
        cy: number,
        waypoint: Waypoint,
        clickCallback: (Waypoint) => void
    ) {
        const dot = SvgCircleBuilder.builder()
            .setCx(cxProc.toString() + '%')
            .setCy(cy.toString())
            .setR('6')
            .setStyle('stroke:#FF00FF; stroke-width:0px; fill:rgba(255, 0, 255, 1.0); cursor: pointer')
            .setShapeRendering('crispEdges')
            .build();

        if (clickCallback) {
            dot.addEventListener('click', function () {
                clickCallback(waypoint);
            });
        }

        svg.appendChild(dot);
    }


    private static addRouteDotPlumline(
        svg: SVGElement,
        cxProc: number,
        cy: number,
        heightPx: number
    ) {
        svg.appendChild(SvgLineBuilder.builder()
            .setX1Percent(cxProc)
            .setX2Percent(cxProc)
            .setY1(cy.toString())
            .setY2(heightPx.toString())
            .setStrokeStyle('#FF00FF', 1)
            .setShapeRenderingCrispEdges()
            .setStrokeDashArrayOnOff(3, 5)
            .build());
    }


    private static addWaypointLabel(
        svg: SVGElement,
        xProc: number,
        y: number,
        waypoint: Waypoint,
        textAnchor: string,
        clickCallback: (Waypoint) => void
    ) {
        let transformX: number;

        switch (textAnchor) {
            case 'start':
                transformX = 7;
                break;
            case 'end':
                transformX = -7;
                break;
            default:
                transformX = 0;
                break;
        }

        // glow around label
        svg.appendChild(SvgTextBuilder.builder()
            .setText(waypoint.checkpoint)
            .setX(xProc.toString() + '%')
            .setY(y.toString())
            .setStyle('stroke:#FFFFFF; stroke-width:5px; fill:#FFFFFF; cursor: pointer')
            .setTextAnchor(textAnchor)
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('15px')
            .setFontWeight('bold')
            .setTransform('translate(' + transformX + ', -15)')
            .build()
        );

        // label
        const label = SvgTextBuilder.builder()
            .setText(waypoint.checkpoint)
            .setX(xProc.toString() + '%')
            .setY(y.toString())
            .setStyle('stroke:none; fill:#660066; cursor: pointer')
            .setTextAnchor(textAnchor)
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('15px')
            .setFontWeight('bold')
            .setTransform('translate(' + transformX + ', -15)')
            .build();

        if (clickCallback) {
            label.addEventListener('click', function () {
                clickCallback(waypoint);
            });
        }

        svg.appendChild(label);
    }
}
