import * as Rx from 'rxjs';
import * as ol from "openlayers";
import { UnitconversionService } from "../../services/utils/unitconversion.service";
import { Waypoint2 } from "../stream-model/waypoint2";
import { OlBase2 } from "./ol-base2";


export class OlWaypoint2 extends OlBase2 {
    private readonly dirBearFeature: ol.Feature;
    private readonly pointFeature: ol.Feature;
    private positionSubscription: Rx.Subscription;
    private previousPositionSubscription: Rx.Subscription;
    private textMtRotSubscription: Rx.Subscription;
    private mtDistVarRotSubscription: Rx.Subscription;


    constructor(
        private readonly waypoint$: Rx.Observable<Waypoint2>,
        private readonly source: ol.source.Vector,
        private readonly mapRotation$: Rx.Observable<number>) {

        super();

        this.pointFeature = this.createFeature(waypoint$);
        this.dirBearFeature = this.createFeature(waypoint$);
        this.source.addFeatures([this.pointFeature, this.dirBearFeature]);

        this.positionSubscription = this.waypoint$
            .flatMap(waypoint => waypoint.position$)
            .filter((position) => position !== undefined) // TODO: hide element
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe((position) => {
                this.setPointGeometry(this.pointFeature, position);
            });

        this.previousPositionSubscription = this.waypoint$
            .flatMap(waypoint => waypoint.previousPosition$)
            .filter((position) => position !== undefined) // TODO: hide element
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe((position) => {
                this.setPointGeometry(this.dirBearFeature, position);
            });

        this.textMtRotSubscription = Rx.Observable.combineLatest(
            this.waypoint$.flatMap(waypoint => waypoint.checkpoint$),
            this.waypoint$.flatMap(waypoint => waypoint.mt$),
            this.waypoint$.flatMap(waypoint => waypoint.nextMt$),
            this.mapRotation$,
        )
            .filter(([text, mt, nextMt, mapRotation]) => text !== undefined || mapRotation !== undefined)
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe(([text, mt, nextMt, mapRotation]) => {
                this.pointFeature.setStyle(this.createPointStyle(text, mt, nextMt, mapRotation));
            });

        this.mtDistVarRotSubscription = Rx.Observable.combineLatest(
            this.waypoint$.flatMap(waypoint => waypoint.mt$),
            this.waypoint$.flatMap(waypoint => waypoint.variation$),
            this.waypoint$.flatMap(waypoint => waypoint.dist$),
            this.mapRotation$,
        )
            .filter(([mt, variation, dist, mapRotation]) =>
                mapRotation !== undefined || variation !== undefined || dist !== undefined)
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe(([mt, variation, dist, mapRotation]) => {
                this.dirBearFeature.setStyle(this.createDirBearStyle(mt, variation, dist, mapRotation));
            });
    }


    public destroy() {
        this.positionSubscription.unsubscribe();
        this.previousPositionSubscription.unsubscribe();
        this.textMtRotSubscription.unsubscribe();
        this.mtDistVarRotSubscription.unsubscribe();
        this.removeFeatures([this.pointFeature, this.dirBearFeature], this.source);
    }


    private createPointStyle(text: string, mt_deg: number, nextMt_deg: number, mapRotation_rad: number): ol.style.Style {
        let rot_deg, rot_rad, align;
        const maprot_deg = UnitconversionService.rad2deg(mapRotation_rad);
        let rotateWithView = true;

        if (mt_deg !== undefined && nextMt_deg !== undefined) {
            // en route point
            if (nextMt_deg > mt_deg) {
                rot_deg = (mt_deg + 270 + (nextMt_deg - mt_deg) / 2) % 360;
            } else {
                rot_deg = (mt_deg + 270 + (nextMt_deg + 360 - mt_deg) / 2) % 360;
            }
        } else if (mt_deg === undefined && nextMt_deg !== undefined) {
            // start point
            rot_deg = (nextMt_deg + 180) % 360;
        } else if (mt_deg !== undefined && nextMt_deg === undefined) {
            // end point
            rot_deg = mt_deg;
        } else if (mt_deg === undefined && nextMt_deg === undefined) {
            // single point
            rot_deg = 45; // 45°
            rotateWithView = false;
        } else {
            return undefined;
        }

        if (!rotateWithView || (rot_deg + maprot_deg) % 360 < 180) {
            align = 'end';
        } else {
            align = 'start';
        }

        if (rotateWithView) {
            rot_rad = UnitconversionService.deg2rad(rot_deg + maprot_deg);
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
                offsetX: 15 * Math.sin(rot_rad),
                offsetY: -15 * Math.cos(rot_rad)
            })
        });
    }


    private createDirBearStyle(mt_deg: number, var_deg: number, dist_nm: number, mapRotation_rad: number): ol.style.Style {
        const var_rad = Number(dist_nm) ? UnitconversionService.deg2rad(var_deg) : 0;
        const maprot_deg = UnitconversionService.rad2deg(mapRotation_rad);
        let rotRad, align, text;

        if (!dist_nm) {
            rotRad = 0;
            align = 'end';
            text = '';
        } else if ((mt_deg + maprot_deg + 360) % 360 < 180) {
            rotRad = UnitconversionService.deg2rad(mt_deg - 90);
            align = 'end';
            text = '   ' + mt_deg + '° ' + dist_nm + 'NM >';
        } else {
            rotRad = UnitconversionService.deg2rad(mt_deg - 270);
            align = 'start';
            text = '< ' + mt_deg + '° ' + dist_nm + 'NM   ';
        }

        return new ol.style.Style({
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill({color: '#000000'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 10}),
                rotation: rotRad + var_rad + mapRotation_rad,
                textAlign: align
            })
        });
    }
}
