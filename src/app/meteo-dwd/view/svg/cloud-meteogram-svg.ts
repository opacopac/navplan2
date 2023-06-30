import {SvgElement} from '../../../common/svg/svg-element';
import {SvgFilterElement} from '../../../common/svg/svg-filter-element';
import {SvgFeFloodElement} from '../../../common/svg/svg-fe-flood-element';
import {SvgFeCompositeElement} from '../../../common/svg/svg-fe-composite-element';
import { CloudMeteogramStep } from '../../domain/model/cloud-meteogram-step';



export class CloudMeteogramSvg {
    private static readonly ID_TEXTBG_BLUE = 'textBgBlue';
    private static readonly ID_TEXTBG_RED = 'textBgRed';
    private static readonly ID_TEXTBG_GREEN = 'textBgGreeen';


    public static create(
        steps: CloudMeteogramStep[],
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString(),
            'none',
            'map-terrain-svg'
        );

        svg.appendChild(this.createFilterDefs());
        //svg.appendChild(TerrainSvg.create(verticalMap, imageWidthPx, imageHeightPx));
        //svg.appendChild(VerticalCloudsSvg.create(verticalMap, imageWidthPx, imageHeightPx));
        //svg.appendChild(VerticalWindSvg.create(verticalMap, imageWidthPx, imageHeightPx));
        //svg.appendChild(GridSvg.create(verticalMap.mapHeight));

        return svg;
    }


    private static createFilterDefs(): SVGDefsElement {
        const defs = document.createElementNS(SvgElement.SVG_NS, 'defs');
        /*this.addColorFilter(defs, VerticalMapSvg.ID_TEXTBG_BLUE, '#1780C2');
        this.addColorFilter(defs, VerticalMapSvg.ID_TEXTBG_RED, '#AE1E22');
        this.addColorFilter(defs, VerticalMapSvg.ID_TEXTBG_GREEN, '#009640');*/

        return defs;
    }


    private static addColorFilter(defs: SVGDefsElement, id: string, color: string) {
        const filter = SvgFilterElement.create(id, '0', '0', '1', '1');
        defs.appendChild(filter);

        const feFlood = SvgFeFloodElement.create(color);
        filter.appendChild(feFlood);

        const feComp = SvgFeCompositeElement.create('SourceGraphic');
        filter.appendChild(feComp);
    }
}
