import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {SvgRectangleElement} from '../../common/svg/svg-rectangle-element';
import {SvgTextElement} from '../../common/svg/svg-text-element';
import {VerticalAirspace} from '../domain-model/vertical-airspace';
import {SvgGroupElement} from '../../common/svg/svg-group-element';
import {SvgPolygonElement} from '../../common/svg/svg-polygon-element';
import {SvgTitleElement} from '../../common/svg/svg-title-element';


export class AirspaceSvg {
    public static create(
        verticalAirspaces: VerticalAirspace[],
        maxelevation: Length,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGElement {
        const airspaceSvg = SvgGroupElement.create();

        // sort airspaces top down (lower ones, e.g. CTR will be drawn "in front" of higher ones)
        verticalAirspaces.sort(function(a, b) {
            return b.distBotTops[0][1].m - a.distBotTops[0][1].m;
        });


        // add airspace polygons to svg
        for (let i = 0; i < verticalAirspaces.length; i++) {
            const airspace = verticalAirspaces[i];
            const points: [number, number][] = [];

            // upper heights
            for (let j = 0; j < airspace.distBotTops.length; j++) {
                points.push(
                    this.getPointArray(
                        airspace.distBotTops[j][0],
                        airspace.distBotTops[j][2],
                        airspace.totalDistance,
                        maxelevation,
                        imageWidthPx,
                        imageHeightPx
                    )
                );
            }

            // lower heights
            for (let j = airspace.distBotTops.length - 1; j >= 0; j--) {
                points.push(
                    this.getPointArray(
                        airspace.distBotTops[j][0],
                        airspace.distBotTops[j][1],
                        airspace.totalDistance,
                        maxelevation,
                        imageWidthPx,
                        imageHeightPx
                    )
                );
            }

            // polygon
            const polygon = SvgPolygonElement.create(points);
            this.setAirspacePolyLineStyle(polygon, airspace.airspace.category);
            airspaceSvg.appendChild(polygon);

            // tooltip
            polygon.appendChild(
                SvgTitleElement.create(verticalAirspaces[i].airspace.name)
            );

            // category label
            const ptBottomLeft = this.getPointArray(
                airspace.distBotTops[0][0],
                airspace.distBotTops[0][1],
                airspace.totalDistance,
                maxelevation,
                imageWidthPx,
                imageHeightPx
            );
            if (ptBottomLeft[1] > 0) {
                this.addAirspaceCategory(airspaceSvg, ptBottomLeft, airspace.airspace.category);
            }
        }

        return airspaceSvg;
    }


    private static setAirspacePolyLineStyle(polyline: SVGPolygonElement, category: string) {
        switch (category) {
            case 'CTR':
                polyline.setAttribute('style', 'fill:rgba(152, 206, 235, 0.7); stroke:rgba(23, 128, 194, 0.8); stroke-width:3px');
                // polyline.setAttribute("style", "fill:rgba(23, 128, 194, 0.6); stroke:rgba(23, 128, 194, 0.8); stroke-width:3px");
                polyline.setAttribute('stroke-dasharray', '10, 7');
                break;
            case 'A' :
                polyline.setAttribute('style', 'fill:rgba(174, 30, 34, 0.2); stroke:rgba(174, 30, 34, 0.8); stroke-width:4px');
                break;
            case 'B':
            case 'C':
            case 'D':
                polyline.setAttribute('style', 'fill:rgba(23, 128, 194, 0.2); stroke:rgba(23, 128, 194, 0.8); stroke-width:3px');
                break;
            case 'E':
                polyline.setAttribute('style', 'fill:rgba(23, 128, 194, 0.2); stroke:rgba(23, 128, 194, 0.8); stroke-width:3px');
                break;
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                polyline.setAttribute('style', 'fill:rgba(174, 30, 34, 0.2); stroke:rgba(174, 30, 34, 0.8); stroke-width:3px');
                break;
            case 'TMZ':
            case 'RMZ':
            case 'FIS':
                polyline.setAttribute('style', 'fill:rgba(23, 128, 194, 0.2); stroke:rgba(23, 128, 194, 0.8); stroke-width:3px');
                polyline.setAttribute('stroke-dasharray', '3, 7');
                break;
            case 'GLIDING':
            case 'WAVE':
                polyline.setAttribute('style', 'fill:rgba(0, 150, 64, 0.2); stroke:rgba(0, 150, 64, 0.8); stroke-width:3px');
                break;
            default :
                polyline.setAttribute('style', 'fill:none; stroke:none; stroke-width:0px');
                return;
        }
    }


    private static addAirspaceCategory(svg: SVGElement, point: [number, number], cat: string) {
        const height = 20;
        const charWidth1 = 14;
        const charWidth3 = 33;
        const x = point[0];
        const y = point[1];
        const colorBlue = 'rgba(23, 128, 194, 0.8)'; // "#1780C2";
        const colorRed = 'rgba(174, 30, 34, 0.8)'; // "#AE1E22";
        const colorGreen = 'rgba(0, 150, 64, 0.8)'; // "#009640";

        switch (cat) {
            case 'CTR':
                this.addText(svg, cat, x, y, charWidth3, height, colorBlue);
                break;
            case 'A' :
                this.addText(svg, cat, x, y, charWidth1, height, colorRed);
                break;
            case 'B':
            case 'C':
            case 'D':
            case 'E':
                this.addText(svg, cat, x, y, charWidth1, height, colorBlue);
                break;
            case 'DANGER':
                this.addText(svg, 'Dng', x, y, charWidth3, height, colorRed);
                break;
            case 'RESTRICTED':
                this.addText(svg, 'R', x, y, charWidth1, height, colorRed);
                break;
            case 'PROHIBITED':
                this.addText(svg, 'P', x, y, charWidth1, height, colorRed);
                break;
            case 'TMZ':
            case 'RMZ':
            case 'FIS':
                this.addText(svg, cat, x, y, charWidth3, height, colorBlue);
                break;
            case 'GLIDING':
            case 'WAVE':
                this.addText(svg, 'GLD', x, y, charWidth3, height, colorGreen);
                break;
        }
    }


    private static addText(svg: SVGElement, text: string, x: number, y: number, width: number, height: number, color: string) {
        svg.appendChild(SvgRectangleElement.create(
            x.toString(),
            (y - height).toString(),
            width.toString(),
            height.toString(),
            'fill:' + color + ';stroke-width:0'
        ));

        svg.appendChild(SvgTextElement.create(
            text,
            Math.round(x + width / 2).toString(),
            Math.round(y - height / 2).toString(),
            'stroke:none; fill:#FFFFFF;',
            'middle',
            'Calibri,sans-serif',
            '14px',
            'bold',
            'translate(0 4)'
        ));
    }


    private static getPointArray(
        dist: Length,
        height: Length,
        maxdistance: Length,
        maxelevation: Length,
        imageWidthPx: number,
        imageHeightPx: number
    ): [number, number] {
        const x = Math.round(dist.m / maxdistance.m * imageWidthPx);
        const y = Math.round((maxelevation.m - height.m) / maxelevation.m * imageHeightPx);

        return [x, y];
    }
}
