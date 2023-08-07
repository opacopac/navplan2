import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgCircleElement} from '../../../common/svg/svg-circle-element';
import {SvgTextElement} from '../../../common/svg/svg-text-element';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {VerticalMapWaypointStep} from '../../domain/model/vertical-map-waypoint-step';


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
            svg.appendChild(
                SvgLineElement.create(
                    horDistPercent.toString() + '%',
                    horDistNextPercent.toString() + '%',
                    '40',
                    '40',
                    'stroke:rgba(255, 0, 255, 1.0); stroke-width:5px;',
                    undefined,
                    'crispEdges'
                )
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
        const dot = SvgCircleElement.create(
            cxProc.toString() + '%',
            cy.toString(),
            '6',
            'stroke:#FF00FF; stroke-width:0px; fill:rgba(255, 0, 255, 1.0); cursor: pointer',
            'crispEdges'
        );

        if (clickCallback) {
            dot.addEventListener('click', function() { clickCallback(waypoint); });
        }

        svg.appendChild(dot);
    }


    private static addRouteDotPlumline(
        svg: SVGElement,
        cxProc: number,
        cy: number,
        heightPx: number
    ) {
        svg.appendChild(
            SvgLineElement.create(
                cxProc.toString() + '%',
                cxProc.toString() + '%',
                cy.toString(), // TODO: temp
                heightPx.toString(), // TODO: temp
                'stroke:#FF00FF; stroke-width:1px;',
                undefined,
                'crispEdges',
                '3, 5'
            )
        );
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
        svg.appendChild(
            SvgTextElement.create(
                waypoint.checkpoint,
                xProc.toString() + '%',
                y.toString(),
                'stroke:#FFFFFF; stroke-width:5px; fill:#FFFFFF; cursor: pointer',
                textAnchor,
                undefined,
                'Calibri,sans-serif',
                '15px',
                'bold',
                'translate(' + transformX + ', -15)'
            )
        );

        // label
        const label = SvgTextElement.create(
            waypoint.checkpoint,
            xProc.toString() + '%',
            y.toString(),
            'stroke:none; fill:#660066; cursor: pointer',
            textAnchor,
            undefined,
            'Calibri,sans-serif',
            '15px',
            'bold',
            'translate(' + transformX + ', -15)'
        );

        if (clickCallback) {
            label.addEventListener('click', function() { clickCallback(waypoint); });
        }

        svg.appendChild(label);
    }
}
