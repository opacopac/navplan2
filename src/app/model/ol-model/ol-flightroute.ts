import * as ol from 'openlayers';
import { UnitconversionService } from '../../services/utils/unitconversion.service';
import { Flightroute } from '../flightroute';
import { Waypoint } from '../waypoint';


export class OlFlightroute {
    public constructor(
        private flightroute: Flightroute) {
    }


    public draw(source: ol.source.Vector, mapRotationRad: number) {
        // draw waypoints
        let prevWp, nextWp: Waypoint;

        for (let i = 0; i < this.flightroute.waypoints.length; i++) {
            if (i < this.flightroute.waypoints.length - 1) {
                nextWp = this.flightroute.waypoints[i + 1];
            } else if (this.flightroute.alternate) {
                nextWp = this.flightroute.alternate;
            } else {
                nextWp = undefined;
            }

            this.drawWaypoint(source, this.flightroute.waypoints[i], nextWp, mapRotationRad);
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

            this.drawWaypoint(source, prevWp, nextWp, mapRotationRad);

            if (nextWp) {
                this.drawWaypoint(source, nextWp, undefined, mapRotationRad);
                this.drawRouteLine([prevWp, nextWp], source, true);
            }
        }
    }


    private drawWaypoint(source: ol.source.Vector, wp: Waypoint, nextWp: Waypoint, mapRotationRad: number) {
        // get wp coordinates
        const mapCoord = wp.position.getMercator();

        // add waypoint + label
        const wpFeature  = new ol.Feature({
            geometry: new ol.geom.Point(mapCoord)
        });

        const wpStyle = this.createWaypointStyle(wp, nextWp, mapRotationRad);
        wpFeature.setStyle(wpStyle);
        source.addFeature(wpFeature);

        if (!nextWp) {
            return;
        }

        // add direction & bearing label
        const dbFeature  = new ol.Feature({
            geometry: new ol.geom.Point(mapCoord)
        });

        const dbStyle = this.createDirBearStyle(nextWp, mapRotationRad);
        dbFeature.setStyle(dbStyle);
        source.addFeature(dbFeature);
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

        /*if (!isAlternate) {
            addModifyInteraction(trackFeature);
        }*/
    }


    private createWaypointStyle(wp1: Waypoint, wp2: Waypoint, mapRotationRad: number): ol.style.Style {
        let rotDeg, rotRad, align;
        const maprotDeg = UnitconversionService.rad2deg(mapRotationRad);
        let rotateWithView = true;

        if (wp1.mt && wp2) {
            // en route point
            if (wp2.mt > wp1.mt) {
                rotDeg = (wp1.mt + 270 + (wp2.mt - wp1.mt) / 2) % 360;
            } else {
                rotDeg = (wp1.mt + 270 + (wp2.mt + 360 - wp1.mt) / 2) % 360;
            }
        } else if (!wp1.mt && wp2) {
            // start point
            rotDeg = (wp2.mt + 180) % 360;
        } else if (wp1.mt && !wp2) {
            // end point
            rotDeg = wp1.mt;
        } else if (!wp1.mt && !wp2) {
            // single point
            rotDeg = 45; // 45°
            rotateWithView = false;
        } else {
            return undefined;
        }

        if (!rotateWithView || (rotDeg + maprotDeg) % 360 < 180) {
            align = 'end';
        } else {
            align = 'start';
        }

        if (rotateWithView) {
            rotRad = UnitconversionService.deg2rad(rotDeg + maprotDeg);
        } else {
            rotRad = UnitconversionService.deg2rad(rotDeg);
        }

        return  new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#FF00FF'
                    // TODO: rotateWithView: true
                })
            }),
            text: new ol.style.Text({
                font: 'bold 16px Calibri,sans-serif',
                text: wp1.checkpoint,
                fill: new ol.style.Fill( { color: '#660066' } ),
                stroke: new ol.style.Stroke( {color: '#FFFFFF', width: 10 } ),
                textAlign: align,
                offsetX: 15 * Math.sin(rotRad),
                offsetY: -15 * Math.cos(rotRad)
            })
        });
    }


    private createDirBearStyle(wp: Waypoint, mapRotationRad: number): ol.style.Style {
        const varRad = Number(wp.variation) ? UnitconversionService.deg2rad(wp.variation) : 0;
        const maprotDeg = UnitconversionService.rad2deg(mapRotationRad);
        let rotRad, align, text;

        if (!wp) {
            rotRad = 0;
            align = 'end';
            text = '';
        } else if ((wp.mt + maprotDeg + 360) % 360 < 180) {
            rotRad = UnitconversionService.deg2rad(wp.mt - 90);
            align = 'end';
            text = '   ' + wp.mt + '° ' + wp.dist + 'NM >';
        } else {
            rotRad = UnitconversionService.deg2rad(wp.mt - 270);
            align = 'start';
            text = '< ' + wp.mt + '° ' + wp.dist + 'NM   ';
        }

        return  new ol.style.Style({
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill( { color: '#000000' } ),
                stroke: new ol.style.Stroke( {color: '#FFFFFF', width: 10 } ),
                rotation: rotRad + varRad + mapRotationRad,
                textAlign: align
            })
        });
    }
}
