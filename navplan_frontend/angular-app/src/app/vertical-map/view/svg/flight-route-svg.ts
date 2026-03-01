import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgCircleBuilder} from '../../../common/svg/svg-circle-builder';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgTitleElement} from '../../../common/svg/svg-title-element';
import {LegAltitudeMetadata} from '../../domain/model/leg-altitude-metadata';


export class FlightRouteSvg {
    public static create(
        legs: LegAltitudeMetadata[],
        imgDim: ImageDimensionsSvg,
        wpClickCallback: (Waypoint) => void
    ): SVGElement {
        const svg = SvgGroupElement.create();
        debugger;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            const legStartXy = imgDim.calcXy(leg.startLength, leg.startAlt.displayAlt);
            const legEndXy = imgDim.calcXy(leg.endLength, leg.endAlt.displayAlt);

            this.addLineSegment(svg, legStartXy, legEndXy);

            // leg start dot
            this.addRouteDot(svg, legStartXy, leg.wpStart, wpClickCallback);
            this.addRouteDotPlumline(svg, legStartXy, imgDim.imageHeightPx);
            this.addWaypointLabel(svg, legStartXy, leg.wpStart, (i === 0) ? 'start' : 'middle', wpClickCallback);

            // leg end dot
            if (i === legs.length - 1) {
                this.addRouteDot(svg, legEndXy, leg.wpEnd, wpClickCallback);
                this.addRouteDotPlumline(svg, legEndXy, imgDim.imageHeightPx);
                this.addWaypointLabel(svg, legEndXy, leg.wpEnd, 'end', wpClickCallback);
            }

            // warning
            if (leg.warning) {
                const legMiddleX = (legStartXy[0] + legEndXy[0]) / 2;
                const legMiddleY = (legStartXy[1] + legEndXy[1]) / 2;
                this.addRouteWarning(svg, [legMiddleX, legMiddleY], leg.warning);
            }
        }

        return svg;
    }


    private static addLineSegment(
        svg: SVGElement,
        startXy: [number, number],
        endXy: [number, number]
    ) {
        svg.appendChild(SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('rgba(255, 0, 255, 1.0)', 5)
            .setShapeRenderingCrispEdges()
            .build()
        );
    }


    private static addRouteDot(
        svg: SVGElement,
        xy: [number, number],
        waypoint: Waypoint,
        clickCallback: (Waypoint) => void
    ) {
        const dot = SvgCircleBuilder.builder()
            .setCxy(xy)
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
        xy: [number, number],
        heightPx: number
    ) {
        svg.appendChild(SvgLineBuilder.builder()
            .setStartXy(xy)
            .setEndXy([xy[0], heightPx])
            .setStrokeStyle('#FF00FF', 1)
            .setShapeRenderingCrispEdges()
            .setStrokeDashArrayOnOff(3, 5)
            .build());
    }


    private static addWaypointLabel(
        svg: SVGElement,
        xy: [number, number],
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
            .setXy(xy)
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
            .setXy(xy)
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


    private static addRouteWarning(
        svg: SVGElement,
        xy: [number, number],
        message: string
    ) {
        const icon = SvgTextBuilder.builder()
            .setXy(xy)
            .setStyle('stroke:#FFFF00; fill:#FFFF00; cursor: help')
            .setTextAnchor('middle')
            .setFontFamily('Calibri,sans-serif')
            .setFontWeight('bold')
            .setFontSize('24px')
            .setTransform('translate(0 6)')
            .setText('⚠️')
            .build();

        const title = SvgTitleElement.create(message);
        icon.appendChild(title);

        svg.appendChild(icon);
    }
}
