import {SvgRectangleElement} from '../../../common/svg/svg-rectangle-element';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {SvgTitleElement} from '../../../common/svg/svg-title-element';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {VerticalMapAirspace} from '../../domain/model/vertical-map-airspace';


export class AirspaceSvg {
    public static create(
        vmAirspaces: VerticalMapAirspace[],
        imgDim: ImageDimensionsSvg
    ): SVGElement {
        const airspaceSvg = SvgGroupElement.create();

        // sort airspaces top down (lower ones, e.g. CTR will be drawn "in front" of higher ones)
        const sortedVmAirspaces = [...vmAirspaces].sort((a, b) => {
            return b.airspaceSteps[0].botAltAmsl?.ft - a.airspaceSteps[0].botAltAmsl?.ft;
        });


        // add airspace polygons to svg
        for (let i = 0; i < sortedVmAirspaces.length; i++) {
            const vmAirspace = sortedVmAirspaces[i];
            const points: [number, number][] = [];

            // upper heights
            for (let j = 0; j < vmAirspace.airspaceSteps.length; j++) {
                points.push(
                    imgDim.calcXy(
                        vmAirspace.airspaceSteps[j].horDist,
                        vmAirspace.airspaceSteps[j].topAltAmsl
                    )
                );
            }

            // lower heights
            for (let j = vmAirspace.airspaceSteps.length - 1; j >= 0; j--) {
                points.push(
                    imgDim.calcXy(
                        vmAirspace.airspaceSteps[j].horDist,
                        vmAirspace.airspaceSteps[j].botAltAmsl
                    )
                );
            }

            // polygon
            const polygon = SvgPolygonElement.create(points);
            this.setAirspacePolyLineStyle(polygon, vmAirspace.airspaceCategory);
            airspaceSvg.appendChild(polygon);

            // tooltip
            polygon.appendChild(
                SvgTitleElement.create(vmAirspace.airspaceName)
            );

            // category label
            const ptBottomLeft = imgDim.calcXy(
                vmAirspace.airspaceSteps[0].horDist,
                vmAirspace.airspaceSteps[0].botAltAmsl
            );
            if (ptBottomLeft[1] > 0) {
                this.addAirspaceCategory(airspaceSvg, ptBottomLeft, vmAirspace.airspaceCategory);
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
            case 'FIZ':
            case 'ATZ':
                polyline.setAttribute('style', 'fill:rgba(23, 128, 194, 0.2); stroke:rgba(23, 128, 194, 0.8); stroke-width:3px');
                polyline.setAttribute('stroke-dasharray', '3, 7');
                break;
            case 'GLIDING':
            case 'WAVE':
            case 'SPORT':
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

        svg.appendChild(SvgTextElementBuilder.builder()
            .setText(text)
            .setX(Math.round(x + width / 2).toString())
            .setY(Math.round(y - height / 2).toString())
            .setStyle('stroke:none; fill:#FFFFFF;')
            .setTextAnchor('middle')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('14px')
            .setFontWeight('bold')
            .setTransform('translate(0 4)')
            .build()
        );
    }
}
