import {SvgFilterElement} from '../../../common/svg/svg-filter-element';
import {SvgFeFloodElement} from '../../../common/svg/svg-fe-flood-element';
import {SvgFeCompositeElement} from '../../../common/svg/svg-fe-composite-element';
import {HeightGridSvg} from '../../../meteo-dwd/view/svg/height-grid-svg';
import {TerrainSvg} from './terrain-svg';
import {AirspaceSvg} from './airspace-svg';
import {FlightRouteSvg} from './flight-route-svg';
import {VerticalMap} from '../../domain/model/vertical-map';
import {VerticalCloudsSvg} from './vertical-clouds-svg';
import {VerticalWindSvg} from './vertical-wind-svg';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgBuilder} from '../../../common/svg/svg-builder';


export class VerticalMapSvg {
    private static readonly ID_TEXTBG_BLUE = 'textBgBlue';
    private static readonly ID_TEXTBG_RED = 'textBgRed';
    private static readonly ID_TEXTBG_GREEN = 'textBgGreeen';


    public static create(
        verticalMap: VerticalMap,
        imageWidthPx: number,
        imageHeightPx: number,
        wpClickCallback: (Waypoint) => void
    ): SVGSVGElement {
        const imgDim = new ImageDimensionsSvg(
            verticalMap.mapWidth,
            verticalMap.mapHeight,
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setCssClass('map-terrain-svg')
            .build();
        svg.appendChild(this.createFilterDefs());
        svg.appendChild(TerrainSvg.create(verticalMap.terrainSteps, imgDim));
        svg.appendChild(AirspaceSvg.create(verticalMap.vmAirspaces, imgDim));
        svg.appendChild(VerticalCloudsSvg.create(verticalMap.verticalCloudColumns, imgDim));
        svg.appendChild(VerticalWindSvg.create(verticalMap.verticalWindColumns, imgDim));
        svg.appendChild(HeightGridSvg.create(verticalMap.mapHeight));
        svg.appendChild(FlightRouteSvg.create(verticalMap.waypointSteps, imgDim, wpClickCallback));

        return svg;
    }


    private static createFilterDefs(): SVGDefsElement {
        const defs = document.createElementNS(SvgBuilder.SVG_NS, 'defs');
        this.addColorFilter(defs, VerticalMapSvg.ID_TEXTBG_BLUE, '#1780C2');
        this.addColorFilter(defs, VerticalMapSvg.ID_TEXTBG_RED, '#AE1E22');
        this.addColorFilter(defs, VerticalMapSvg.ID_TEXTBG_GREEN, '#009640');

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
