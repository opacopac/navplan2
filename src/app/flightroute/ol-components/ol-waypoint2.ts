import * as ol from 'openlayers';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {Angle} from '../../shared/model/quantities/angle';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {OlWaypointBearingLabel} from './ol-waypoint-bearing-label';
import {Waypoint} from '../model/waypoint';
import {MapContext} from '../../map/model/map-context';

export class OlWaypoint2 extends OlComponent {
    private readonly pointFeature: ol.Feature;
    private readonly bearingLabel: OlWaypointBearingLabel;
    private positionSubscription: Subscription;
    private textMtRotSubscription: Subscription;


    constructor(
        mapContext: MapContext,
        private readonly waypoint$: Observable<Waypoint>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        // create waypoint feature
        this.pointFeature = new ol.Feature();
        this.source.addFeature(this.pointFeature);

        // create bearing label
        this.bearingLabel = new OlWaypointBearingLabel(this.mapContext, this.waypoint$, source);

        // handle position changes
        /* const pos$ = this.waypoint$.switchMap(wp => wp ? wp.position$ : RxService.getEternal<Position2d>());
        this.positionSubscription = pos$
            .distinctUntilChanged()
            .subscribe(position => {
                if (!position) {
                    this.hideFeature(this.pointFeature);
                } else {
                    this.setPointGeometry(this.pointFeature, position);
                }
            });

        // handle style changes
        this.textMtRotSubscription = Observable.combineLatest(
            this.waypoint$.switchMap(wp => wp ? wp.checkpoint$ : RxService.getEternal<string>()),
            this.waypoint$.switchMap(wp => wp ? wp.mt$ : RxService.getEternal<Angle>()),
            this.waypoint$.switchMap(wp => wp ? wp.nextMt$ : RxService.getEternal<Angle>()),
            this.mapContext.mapService.mapRotation$
        )
            // .filter(([text, mt, nextMt, mapRotation]) => text !== undefined || mapRotation !== undefined)
            .distinctUntilChanged()
            .subscribe(([text, mt, nextMt, mapRotation]) => {
                this.pointFeature.setStyle(this.createStyle(text, mt, nextMt, mapRotation));
            });*/
    }


    public destroy() {
        this.positionSubscription.unsubscribe();
        this.textMtRotSubscription.unsubscribe();
        this.bearingLabel.destroy();
        this.removeFeature(this.pointFeature, this.source);
    }


    private createStyle(text: string, mt: Angle, nextMt: Angle, mapRotation: Angle): ol.style.Style {
        let rot_deg, rot_rad: number;
        let align: string;
        let rotateWithView = true;

        if (mt && nextMt) {
            // en route point
            if (nextMt.deg > mt.deg) {
                rot_deg = (mt.deg + 270 + (nextMt.deg - mt.deg) / 2) % 360;
            } else {
                rot_deg = (mt.deg + 270 + (nextMt.deg + 360 - mt.deg) / 2) % 360;
            }
        } else if (!mt && nextMt) {
            // start point
            rot_deg = (nextMt.deg + 180) % 360;
        } else if (mt && !nextMt) {
            // end point
            rot_deg = mt.deg;
        } else if (!mt && !nextMt) {
            // single point
            rot_deg = 45; // 45°
            rotateWithView = false;
        } else {
            return undefined;
        }

        if (!rotateWithView || (rot_deg + mapRotation.deg) % 360 < 180) {
            align = 'end';
        } else {
            align = 'start';
        }

        if (rotateWithView) {
            rot_rad = UnitconversionService.deg2rad(rot_deg + mapRotation.deg);
        } else {
            rot_rad = UnitconversionService.deg2rad(rot_deg);
        }

        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#FF00FF'
                    // TODO: rotateWithView: true
                })
            }),
            text: new ol.style.Text({
                font: 'bold 16px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill({color: '#660066'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 10}),
                textAlign: align,
                offsetX: 20 * Math.sin(rot_rad),
                offsetY: -20 * Math.cos(rot_rad),
                rotateWithView: false // reason: label may be upside-down after rotation --> recalc
            })
        });
    }
}
