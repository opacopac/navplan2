import {Navaid} from './navaid';
import {Airport} from './airport';
import {Airspace} from './airspace';
import {Reportingpoint} from './reportingpoint';
import {Reportingsector} from './reportingsector';
import {Userpoint} from './userpoint';
import {Webcam} from './webcam';
import {DataItem, DataItemType} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Circuit} from '../../circuits/domain-model/circuit';


const SEARCH_BY_POS_PRECISION_DIGITS = 4;


export class OpenAipItems extends DataItem {
    public navaids: Navaid[];
    public airports: Airport[];
    public airspaces: Airspace[];
    public reportingpoints: Reportingpoint[];
    public reportingsectors: Reportingsector[];
    public userpoints: Userpoint[];
    public webcams: Webcam[];
    public circuits: Circuit[];


    constructor() {
        super();

        this.navaids = [];
        this.airports = [];
        this.airspaces = [];
        this.reportingpoints = [];
        this.reportingsectors = [];
        this.userpoints = [];
        this.webcams = [];
        this.circuits = [];
    }


    public get dataItemType(): DataItemType {
        return DataItemType.openAipItems;
    }


    public findDataItemByPos(
        position: Position2d,
        precisionDigits: number = SEARCH_BY_POS_PRECISION_DIGITS
    ): DataItem {
        for (const airport of this.airports) {
            if (airport.position.equals(position, precisionDigits)) {
                return airport;
            }
        }

        for (const navaid of this.navaids) {
            if (navaid.position.equals(position, precisionDigits)) {
                return navaid;
            }
        }

        for (const userpoint of this.userpoints) {
            if (userpoint.position.equals(position, precisionDigits)) {
                return userpoint;
            }
        }

        for (const reportingpoint of this.reportingpoints) {
            if (reportingpoint.position.equals(position, precisionDigits)) {
                return reportingpoint;
            }
        }

        for (const reportingsector of this.reportingsectors) {
            if (reportingsector.polygon.containsPoint(position)) {
                return reportingsector;
            }
        }

        return undefined;
    }
}
