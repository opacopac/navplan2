import {VerticalMap} from '../../domain/model/vertical-map';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {VerticalMapPointSvg} from './vertical-map-point-svg';
import {WindIcon} from '../../../meteo-common/view/wind_icons/wind-icon';
import {SvgImageElement} from '../../../common/svg/svg-image-element';


export class VerticalWindSvg {
    public static create(verticalMap: VerticalMap, imageWidthPx: number, imageHeightPx: number): SVGElement {
        const MIN_SPACE_HEIGHT_PX = 20;
        const svg = SvgGroupElement.create();

        let lastHeightPx;
        for (let i = 0; i < verticalMap.verticalWindColumns.length - 1; i++) {
            lastHeightPx = null;

            for (let j = verticalMap.verticalWindColumns[i].windLevels.length - 1; j > 0; j--) {
                const windLevel = verticalMap.verticalWindColumns[i].windLevels[j];
                const xy = VerticalMapPointSvg.create(
                    verticalMap.verticalWindColumns[i + 1].horDist,
                    windLevel.alt.getHeightAmsl(),
                    verticalMap.mapWidth,
                    verticalMap.mapHeight,
                    imageWidthPx,
                    imageHeightPx
                );

                if (lastHeightPx === null || Math.abs(xy[1] - lastHeightPx) >= MIN_SPACE_HEIGHT_PX) {
                    const windIcon = WindIcon.createFrom(windLevel.speed, windLevel.direction);
                    const transform = 'rotate(' + (windIcon.rot.deg + 180) + ',' + (xy[0] + 17) + ',' + (xy[1] + 17) + ')';
                    const svgImage = SvgImageElement.create(xy[0] + '', xy[1] + '', undefined, undefined, windIcon.src, transform);
                    svg.appendChild(svgImage);

                    lastHeightPx = xy[1];
                }
            }
        }

        return svg;
    }
}
