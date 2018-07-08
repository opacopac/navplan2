import * as ol from 'openlayers';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {UnitconversionService} from '../../shared/services/unitconversion/unitconversion.service';
import {Angle} from '../../shared/model/quantities/angle';
import {Distance} from '../../shared/model/quantities/distance';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Waypoint} from '../model/waypoint';
import {LengthUnit} from '../../shared/model/units';
import {MapContext} from '../../map/model/map-context';


export class OlWaypointBearingLabel extends OlComponent {
    private readonly dirBearFeature: ol.Feature;
    private previousPositionSubscription: Subscription;
    private mtDistVarRotSubscription: Subscription;


    constructor(
        mapContext: MapContext,
        private readonly waypoint$: Observable<Waypoint>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        // create ol features & add to source
        this.dirBearFeature = this.createFeature(this.waypoint$);
        this.source.addFeatures([this.dirBearFeature]);

        // handle position changes
        /*this.previousPositionSubscription = this.waypoint$
            .switchMap(wp => wp ? wp.previousPosition$ : Observable.of(undefined))
            .distinctUntilChanged()
            .subscribe((position) => {
                if (!position) {
                    this.hideFeature(this.dirBearFeature);
                } else {
                    this.setPointGeometry(this.dirBearFeature, position);
                }
            });


        // handle style changes
        this.mtDistVarRotSubscription = Observable.combineLatest(
            this.waypoint$.switchMap(wp => wp ? wp.mt$ : Observable.of(undefined)),
            this.waypoint$.switchMap(wp => wp ? wp.variation$ : Observable.of(undefined)),
            this.waypoint$.switchMap(wp => wp ? wp.dist$ : Observable.of(undefined)),
            this.mapContext.mapService.mapRotation$
        )
            .filter(([mt, variation, dist, mapRotation]) =>
                mapRotation !== undefined || variation !== undefined || dist !== undefined)
            .distinctUntilChanged()
            .subscribe(([mt, variation, dist, mapRotation]) => {
                this.dirBearFeature.setStyle(this.createStyle(mt, variation, dist, mapRotation));
            });*/
    }


    public destroy() {
        this.previousPositionSubscription.unsubscribe();
        this.mtDistVarRotSubscription.unsubscribe();
        this.removeFeatures([this.dirBearFeature], this.source);
    }


    private createStyle(mt: Angle, variation: Angle, dist: Distance, mapRotation: Angle): ol.style.Style {
        if (!variation || !dist || !mapRotation) { return undefined; }

        let rotRad, offsetX: number;
        let align, text: string;

        if (!mt) {
            rotRad = 0;
            align = 'end';
            text = '';
            offsetX = 5;
        } else if ((mt.deg + mapRotation.deg + 360) % 360 < 180) {
            rotRad = UnitconversionService.deg2rad(mt.deg - 90);
            align = 'end';
            text = '   ' + Math.round(mt.deg) + '° ' + Math.ceil(dist.getValue(LengthUnit.NM)) + 'NM >';
            offsetX = 5;
        } else {
            rotRad = UnitconversionService.deg2rad(mt.deg - 270);
            align = 'start';
            text = '< ' + Math.round(mt.deg) + '° ' + Math.ceil(dist.getValue(LengthUnit.NM)) + 'NM   ';
            offsetX = -5;
        }

        return new ol.style.Style({
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                text: text,
                fill: new ol.style.Fill({color: '#000000'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 10}),
                rotation: rotRad + variation.rad + mapRotation.rad,
                textAlign: align,
                offsetX: offsetX,
                rotateWithView: false // reason: label may be upside-down after rotation --> recalc
            })
        });
    }
}
