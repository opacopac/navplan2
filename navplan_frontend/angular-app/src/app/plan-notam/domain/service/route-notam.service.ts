import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {IRouteNotamService} from './i-route-notam.service';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRouteNotamRepoService} from './i-route-notam-repo.service';
import {Notam} from '../../../notam/domain/model/notam';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';
import {map} from 'rxjs/operators';
import {NotamLocationType} from '../../../notam/domain/model/notam-location-type';
import {WaypointType} from '../../../flightroute/domain/model/waypoint-type';
import { LocationNotam } from '../model/location-notam';


@Injectable()
export class RouteNotamService implements IRouteNotamService {
    public constructor(private routeNotamRepoService: IRouteNotamRepoService) {
    }


    public getRouteNotams(flightroute: Flightroute, maxRadius: Length, interval: TimestampInterval): Observable<LocationNotam[]> {
        return this.routeNotamRepoService.getRouteNotams(flightroute, maxRadius, interval).pipe(
            map(notams => this.groupAndSortNotams(notams, flightroute))
        );
    }

    private groupAndSortNotams(notams: Notam[], flightroute: Flightroute): LocationNotam[] {
        // Group NOTAMs by location
        const groupMap = new Map<string, LocationNotam>();
        
        if (notams) {
            for (const notam of notams) {
                if (!groupMap.has(notam.locationIcao)) {
                    groupMap.set(notam.locationIcao, {
                        locationIcao: notam.locationIcao,
                        stateName: notam.StateName,
                        locationType: notam.locationType,
                        notams: []
                    });
                }
                groupMap.get(notam.locationIcao).notams.push(notam);
            }
        }
        
        const locationNotams = Array.from(groupMap.values());
        
        // Create a map of airport ICAO codes to their route order
        const routeOrderMap = new Map<string, number>();
        if (flightroute && flightroute.waypoints) {
            flightroute.waypoints.forEach((wp, index) => {
                if (wp.type === WaypointType.airport && wp.checkpoint) {
                    // Use checkpoint as ICAO code for airports
                    if (!routeOrderMap.has(wp.checkpoint)) {
                        routeOrderMap.set(wp.checkpoint, index);
                    }
                }
            });
            
            // Also check alternate if it exists
            if (flightroute.alternate && flightroute.alternate.type === WaypointType.airport) {
                const alternateIndex = flightroute.waypoints.length;
                if (!routeOrderMap.has(flightroute.alternate.checkpoint)) {
                    routeOrderMap.set(flightroute.alternate.checkpoint, alternateIndex);
                }
            }
        }

        // Sort location NOTAMs
        locationNotams.sort((a, b) => {
            // 1st priority: airports before airspaces
            if (a.locationType !== b.locationType) {
                return a.locationType === NotamLocationType.airport ? -1 : 1;
            }
            
            // 2nd priority: for airports, sort by route order
            if (a.locationType === NotamLocationType.airport) {
                const aOrder = routeOrderMap.get(a.locationIcao);
                const bOrder = routeOrderMap.get(b.locationIcao);
                
                // If both are in route, sort by route order
                if (aOrder !== undefined && bOrder !== undefined) {
                    return aOrder - bOrder;
                }
                
                // Airport in route comes before airport not in route
                if (aOrder !== undefined) return -1;
                if (bOrder !== undefined) return 1;
            }
            
            // Default: sort alphabetically by ICAO code
            return a.locationIcao.localeCompare(b.locationIcao);
        });

        return locationNotams;
    }
}
