import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {IRouteMeteoService} from './i-route-meteo.service';
import {LineString} from '../../geo-physics/domain-model/geometry/line-string';
import {GeodesyHelper} from '../../geo-physics/domain-service/geometry/geodesy-helper';
import {Length} from '../../geo-physics/domain-model/quantities/length';
import {Injectable} from '@angular/core';
import {IMetarTafService} from '../../metar-taf/domain-service/i-metar-taf.service';
import {RouteMetarTafs} from '../domain-model/route-metar-tafs';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';


@Injectable()
export class RouteMeteoService implements IRouteMeteoService {
    private static readonly NUM_CLOSEST_METAR_TAFS = 3;


    public constructor(private metarTafService: IMetarTafService) {
    }


    public getRouteMetarTafs(flightroute: Flightroute, maxRadius: Length): Observable<RouteMetarTafs> {
        if (!flightroute || flightroute.waypoints.length === 0) {
            return of(new RouteMetarTafs([], [], []));
        }

        const lineString = new LineString(flightroute.waypoints.map(wp => wp.position));
        const meteoBox = GeodesyHelper.enlargeExtent(lineString.getBoundingBox(), maxRadius);

        return this.metarTafService.load(meteoBox).pipe(
            map(metarTafs => this.filterByMaxRadius(lineString, maxRadius, metarTafs)),
            map(metarTafs => {
                const startMetarTafs = this.getClosestMetarTafs(flightroute.waypoints[0].getPosition(), maxRadius, metarTafs);
                const endMetarTafs = this.getClosestMetarTafs(flightroute.waypoints[flightroute.waypoints.length - 1].getPosition(), maxRadius, metarTafs);
                const enRouteMetarTafs = this.getRemainingMetarTafs(flightroute.waypoints[0].getPosition(), metarTafs);

                return new RouteMetarTafs(
                    startMetarTafs,
                    endMetarTafs,
                    enRouteMetarTafs
                );
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


    private getClosestMetarTafs(startPos: Position2d, maxRadius: Length, metarTafs: MetarTaf[]): MetarTaf[] {
        return metarTafs
            .filter(metarTaf => GeodesyHelper.calcDistance(startPos, metarTaf.position).m <= maxRadius.m)
            .sort((mt1, mt2) => {
                return GeodesyHelper.distanceComparer(startPos, mt1.getPosition(), mt2.getPosition());
            })
            .slice(0, RouteMeteoService.NUM_CLOSEST_METAR_TAFS);
    }


    private getRemainingMetarTafs(startPos: Position2d, metarTafs: MetarTaf[]): MetarTaf[] {
        return metarTafs
            .sort((mt1, mt2) => {
                return GeodesyHelper.distanceComparer(startPos, mt1.getPosition(), mt2.getPosition());
            });
    }
}
