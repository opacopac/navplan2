import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {IRouteMeteoService} from './i-route-meteo.service';
import {LineString} from '../../../geo-physics/domain/model/geometry/line-string';
import {GeodesyHelper} from '../../../geo-physics/domain/service/geometry/geodesy-helper';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Injectable} from '@angular/core';
import {IMetarTafService} from '../../../metar-taf/domain/service/i-metar-taf.service';
import {RouteMetarTafSet} from '../model/route-metar-taf-set';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MetarTaf} from '../../../metar-taf/domain/model/metar-taf';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {RouteMetarTaf} from '../model/route-metar-taf';


@Injectable()
export class RouteMeteoService implements IRouteMeteoService {
    public constructor(private metarTafService: IMetarTafService) {
    }


    public getRouteMetarTafs(flightroute: Flightroute, maxRadius: Length): Observable<RouteMetarTafSet> {
        if (!flightroute || flightroute.waypoints.length === 0) {
            return of(new RouteMetarTafSet([]));
        }

        const lineString = new LineString(flightroute.getWaypointsInclAlternate().map(wp => wp.position));
        const meteoBox = GeodesyHelper.enlargeExtent(lineString.getBoundingBox(), maxRadius);

        return this.metarTafService.load(meteoBox).pipe(
            map(metarTafs => this.filterByMaxRadius(lineString, maxRadius, metarTafs)),
            map(metarTafs => {
                const routeMetarTafs = this.getRemainingMetarTafs(flightroute.waypoints[0].getPosition(), metarTafs);

                return new RouteMetarTafSet(routeMetarTafs);
            }),
        );
    }


    private filterByMaxRadius(lineString: LineString, maxRadius: Length, metarTafs: MetarTaf[]): MetarTaf[] {
        const lineBoxes = lineString
            .toLineList()
            .map(line => GeodesyHelper.getLineBox(line, maxRadius));

        return metarTafs.filter(metarTaf => {
            const pos = metarTaf.getPosition();
            let isInside = false;
            for (const lineBox of lineBoxes) {
                if (lineBox.containsPoint(pos)) {
                    isInside = true;
                    break;
                }
            }

            return isInside;
        });
    }


    private getRemainingMetarTafs(startPos: Position2d, metarTafs: MetarTaf[]): RouteMetarTaf[] {
        return metarTafs
            .map(metarTaf => new RouteMetarTaf(metarTaf, GeodesyHelper.calcDistance(startPos, metarTaf.position)))
            .sort((rmt1, rmt2) => {
                return GeodesyHelper.distanceComparer(startPos, rmt1.metarTaf.getPosition(), rmt2.metarTaf.getPosition());
            });
    }
}
