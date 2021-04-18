import {DataItem, DataItemType} from '../../common/model/data-item';
import {NotamLocationType} from './notam-location-type';
import {NotamGeometry} from './notam-geometry';


export class Notam extends DataItem {
    constructor(
        public id: number,
        public idnotam: string, // ID of the NOTAM
        public fullNotam: string, // Full NOTAM
        public startDate: Date, // Start datatime of the NOTAM
        public endDate: Date, // End datatime of the NOTAM, 100 years after startdate for permanent (PERM) notams
        public createdDate: Date, // Dattime the NOTAM was created
        public locationIcao: string, // ICAO code of the location the NOTAM applies to
        public isIcaoFormat: boolean, // If the NOTAM is compliant with Doc ABC. If false, no Q-code decoding is available
        public key: string, // Concatenation of ID and Location to form unique id for all NOTAMS
        public locationType: NotamLocationType, // Location type, either airspace or airport
        public StateCode: string, // ISO 3-Letter code of the State
        public StateName: string, // Name of the State
        public entity: string, // First 2 letters of the Q-code, if available
        public status: string, // Last 2 letters of the Q-code, if available
        public qCode: string, // Q-code of the NOTAM, if available
        public area: string, // Decoded category first 2 letters of the Q-code
        public subArea: string, // Decoded area of first 2 letters of the Q-code
        public condition: string, // Decoded sub-area of first 2 letters of the Q-code
        public subject: string, // Decoded area of last 2 letters of the Q-code
        public modifier: string, // Decoded sub-area of last 2 letters of the Q-code
        public message: string, // Message part of the NOTAM, if available
        public geometry: NotamGeometry) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.notam;
    }
}
