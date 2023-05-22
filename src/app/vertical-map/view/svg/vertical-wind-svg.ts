import {VerticalMap} from '../../domain/model/vertical-map';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {VerticalMapPointSvg} from './vertical-map-point-svg';
import {WindIcon} from '../../../meteo-common/view/wind_icons/wind-icon';
import {SvgImageElement} from '../../../common/svg/svg-image-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class VerticalWindSvg {
    public static create(verticalMap: VerticalMap, imageWidthPx: number, imageHeightPx: number): SVGElement {
        const svg = SvgGroupElement.create();

        if (verticalMap.verticalWindColumns.length >= 2) {
            const halfHorStepDist = new Length((verticalMap.verticalWindColumns[1].horDist.m - verticalMap.verticalWindColumns[0].horDist.m) / 2, LengthUnit.M);

            let lastX = null;
            for (let i = 0; i < verticalMap.verticalWindColumns.length; i++) {
                let lastY = null;

                for (let j = verticalMap.verticalWindColumns[i].windLevels.length - 1; j >= 0; j--) {
                    const windLevel = verticalMap.verticalWindColumns[i].windLevels[j];
                    const xy = VerticalMapPointSvg.create(
                        verticalMap.verticalWindColumns[i].horDist.add(halfHorStepDist),
                        windLevel.alt.getHeightAmsl(),
                        verticalMap.mapWidth,
                        verticalMap.mapHeight,
                        imageWidthPx,
                        imageHeightPx
                    );

                    if (xy[1] < 0) {
                        break;
                    }

                    if (lastX !== null && xy[0] - lastX !== 0 && Math.abs(xy[0] - lastX) < WindIcon.ICON_WIDTH) {
                        break;
                    }

                    if (lastY !== null && Math.abs(xy[1] - lastY) < WindIcon.ICON_HEIGHT) {
                        continue;
                    }

                    const windIcon = WindIcon.createFrom(windLevel.speed, windLevel.direction);
                    const transform = 'rotate(' + windIcon.rot.deg + ',' + xy[0] + ',' + xy[1] + ')';
                    const svgImage = SvgImageElement.create(
                        (xy[0] - WindIcon.ICON_WIDTH / 2) + '',
                        (xy[1] - WindIcon.ICON_WIDTH / 2) + '',
                        undefined,
                        undefined,
                        windIcon.src,
                        transform
                    );
                    svg.appendChild(svgImage);

                    lastX = xy[0];
                    lastY = xy[1];
                }
            }
        }

        return svg;
    }
}
