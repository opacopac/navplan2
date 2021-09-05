import {SvgElement} from '../../common/svg/svg-element';
import {SvgFilterElement} from '../../common/svg/svg-filter-element';
import {SvgFeFloodElement} from '../../common/svg/svg-fe-flood-element';
import {SvgFeCompositeElement} from '../../common/svg/svg-fe-composite-element';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {VerticalAirspace} from '../domain-model/vertical-airspace';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {GridSvg} from './grid-svg';
import {TerrainSvg} from './terrain-svg';
import {TerrainInfo} from '../domain-model/terrain-info';
import {AirspaceSvg} from './airspace-svg';
import {FlightRouteSvg} from './flight-route-svg';


export class VerticalMapSvg {
    private static readonly ID_TEXTBG_BLUE = 'textBgBlue';
    private static readonly ID_TEXTBG_RED = 'textBgRed';
    private static readonly ID_TEXTBG_GREEN = 'textBgGreeen';


    public static create(
        flightRoute: Flightroute,
        terrainInfo: TerrainInfo,
        verticalAirspaces: VerticalAirspace[],
        maxElevation: Length,
        imageWidthPx: number,
        imageHeightPx: number,
        wpClickCallback: (Waypoint) => void
    ): SVGSVGElement {
        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString(),
            'none',
            'map-terrain-svg'
        );

        svg.appendChild(this.createFilterDefs());
        svg.appendChild(TerrainSvg.create(terrainInfo, maxElevation, imageWidthPx, imageHeightPx));
        svg.appendChild(AirspaceSvg.create(verticalAirspaces, maxElevation, imageWidthPx, imageHeightPx));
        svg.appendChild(GridSvg.create(maxElevation));
        svg.appendChild(FlightRouteSvg.create(flightRoute, wpClickCallback));

        return svg;
    }


    private static createFilterDefs(): SVGDefsElement {
        const defs = document.createElementNS(SvgElement.SVG_NS, 'defs');
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
