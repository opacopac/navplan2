import * as ol from 'openlayers';
import { Flightroute } from '../flightroute';
import { Waypoint } from '../waypoint';
import { OlWaypoint } from "./ol-waypoint";


export class OlFlightroute {
    public routeLineFeature: ol.Feature;
    public alternateLineFeature: ol.Feature;


    public constructor(
        private flightroute: Flightroute) {
    }


    public draw(source: ol.source.Vector, mapRotationRad: number) {
        let prevWp, nextWp: Waypoint;

        // draw waypoints
        for (let i = 0; i < this.flightroute.waypoints.length; i++) {
            if (i < this.flightroute.waypoints.length - 1) {
                nextWp = this.flightroute.waypoints[i + 1];
            } else if (this.flightroute.alternate) {
                nextWp = this.flightroute.alternate;
            } else {
                nextWp = undefined;
            }

            const olWp = new OlWaypoint(this.flightroute.waypoints[i], nextWp, mapRotationRad);
            olWp.draw(source);
        }

        this.drawRouteLine(this.flightroute.waypoints, source, false);


        // draw alternate
        if (this.flightroute.alternate) {
            if (this.flightroute.waypoints.length > 0) {
                prevWp = this.flightroute.waypoints[this.flightroute.waypoints.length - 1];
                nextWp = this.flightroute.alternate;
            } else {
                prevWp = this.flightroute.alternate;
                nextWp = undefined;
            }

            const olWp = new OlWaypoint(prevWp, nextWp, mapRotationRad);
            olWp.draw(source);

            if (nextWp) {
                const olWp = new OlWaypoint(nextWp, undefined, mapRotationRad);
                olWp.draw(source);
                this.drawRouteLine([prevWp, nextWp], source, true);
            }
        }
    }



    private drawRouteLine(wps: Waypoint[], source: ol.source.Vector, isAlternate: boolean) {
        if (!wps || wps.length < 2) {
            return;
        }

        // define styles
        let trackStyle;

        if (!isAlternate) {
            trackStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#FF00FF',
                    width: 5
                })
            });
        } else {
            trackStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#FF00FF',
                    width: 4,
                    lineDash: [10, 10]
                })
            });
        }

        // get coordinate list
        const mapCoordList = [];
        for (let i = 0; i < wps.length; i++) {
            mapCoordList.push(wps[i].position.getMercator());
        }

        // add track line segment
        const trackFeature = new ol.Feature({
            geometry: new ol.geom.LineString(mapCoordList)
        });

        trackFeature.setStyle(trackStyle);
        source.addFeature(trackFeature);

        // expose features of route lines (e.g. for interactions)
        if (!isAlternate) {
            this.routeLineFeature = trackFeature;
        } else {
            this.alternateLineFeature = trackFeature;
        }
    }
}
