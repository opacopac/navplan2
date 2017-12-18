import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';


export interface NavaidRestItem {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    frequency: string;
    unit: string;
    declination: number;
    truenorth: boolean;
}


export class Navaid {
    public id: number;
    public type: string;
    public kuerzel: string;
    public name: string;
    public position: Position2d;
    public elevation: number;
    public frequency: string;
    public unit: string;
    public declination: number;
    public truenorth: boolean;

    constructor(restItem: NavaidRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.kuerzel = restItem.kuerzel;
        this.name = restItem.name;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
        this.elevation = restItem.elevation;
        this.frequency = restItem.frequency;
        this.unit = restItem.unit;
        this.declination = restItem.declination;
        this.truenorth = restItem.truenorth;
    }
}


export class NavaidOlFeatureFactory {
    public static createOlFeature(navaid: Navaid): ol.Feature {
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(navaid.position.getMercator())
        });

        const navaidStyle = NavaidOlFeatureFactory.createOlStyle(navaid);

        if (navaidStyle) {
            feature.setStyle(navaidStyle);
            return feature;
        } else {
            return undefined;
        }
    }


    private static createOlStyle(navaid: Navaid): ol.style.Style {
        let src = environment.iconBaseUrl;
        let textOffsetY;

        switch (navaid.type) {
            case 'NDB':
                src += 'navaid_ndb.png';
                textOffsetY = 33;
                break;
            case 'VOR-DME':
            case 'DVOR-DME':
                src += 'navaid_vor-dme.png';
                textOffsetY = 20;
                break;
            case 'VOR':
            case 'DVOR':
                src += 'navaid_vor.png';
                textOffsetY = 20;
                break;
            case 'DME':
                src += 'navaid_dme.png';
                textOffsetY = 20;
                break;
            case 'TACAN':
                src += 'navaid_tacan.png';
                textOffsetY = 25;
                break;
            case 'VORTAC':
            case 'DVORTAC':
                src += 'navaid_vortac.png';
                textOffsetY = 25;
                break;
            default:
                return undefined;
        }


        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.75,
                src: src
            })),
            text: new ol.style.Text({
                //textAlign: align,
                //textBaseline: baseline,
                font: 'bold 14px Calibri,sans-serif',
                text: name,
                fill: new ol.style.Fill({color: '#451A57'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: textOffsetY
            })
        });
    }
}
