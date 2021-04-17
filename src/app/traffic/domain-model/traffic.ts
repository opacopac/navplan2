import {DataItem, DataItemType} from '../../shared/model/data-item';
import {TrafficPosition} from './traffic-position';
import {Clonable} from '../../system/domain-model/clonable';
import {Angle} from '../../geo-math/domain-model/quantities/angle';
import {TrafficAircraftType} from './traffic-aircraft-type';
import {TrafficAddress} from './traffic-address';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';
import {TrackFitter} from '../../geo-math/domain-service/track-fitter';


export class Traffic extends DataItem implements Clonable<Traffic> {
    private _address: TrafficAddress;
    private _acType: TrafficAircraftType;
    private _acIcao: string;
    private _registration: string;
    private _callsign: string;
    private _opIcao: string;
    private _fullCallsign: string;
    private _model: string;
    private _positions: TrafficPosition[];
    private _isDetailsLoaded = false;


    public static createEmpty(address: TrafficAddress): Traffic {
        return new Traffic(
            address,
            TrafficAircraftType.UNKNOWN,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            []
        );
    }


    // region getters / setters

    public set address(value: TrafficAddress) {
        if (value === undefined) {
            throw Error('aircraft address must be defined');
        }

        this._address = value;
    }


    public get address(): TrafficAddress {
        return this._address;
    }


    public set acType(value: TrafficAircraftType) {
        if (value === undefined) {
            throw Error('aircraft type must be defined');
        }

        this._acType = value;
    }


    public get acType(): TrafficAircraftType {
        return this._acType;
    }


    public set acIcao(value: string | undefined) {
        this._acIcao = StringnumberHelper.parseStringOrNull(value, true, true);
    }


    public get acIcao(): string | undefined {
        return this._acIcao;
    }


    public set registration(value: string | undefined) {
        this._registration = StringnumberHelper.parseStringOrNull(value, true, true);
    }


    public get registration(): string | undefined {
        return this._registration;
    }


    public set callsign(value: string | undefined) {
        this._callsign = StringnumberHelper.parseStringOrNull(value, true, true);
    }


    public get callsign(): string | undefined {
        return this._callsign;
    }


    public set opIcao(value: string | undefined) {
        this._opIcao = StringnumberHelper.parseStringOrNull(value, true, true);
    }


    public get opIcao(): string | undefined {
        return this._opIcao;
    }


    public set fullCallsign(value: string | undefined) {
        this._fullCallsign = StringnumberHelper.parseStringOrNull(value, true, false);
    }


    public get fullCallsign(): string | undefined {
        return this._fullCallsign;
    }


    public set model(value: string | undefined) {
        this._model = StringnumberHelper.parseStringOrNull(value, true, true);
    }


    public get model(): string | undefined {
        return this._model;
    }


    public set positions(value: TrafficPosition[]) {
        this._positions = value;
    }


    public get positions(): TrafficPosition[] {
        return this._positions;
    }


    public set isDetailsLoaded(value: boolean) {
        this._isDetailsLoaded = value;
    }


    public get isDetailsLoaded(): boolean {
        return this._isDetailsLoaded;
    }

    // endregion


    constructor(
        address: TrafficAddress,
        acType: TrafficAircraftType,
        acIcao: string,
        registration: string,
        callsign: string,
        opIcao: string,
        fullCallsign: string,
        model: string,
        positions: TrafficPosition[]
    ) {
        super();

        this.address = address;
        this.acType = acType;
        this.acIcao = acIcao;
        this.registration = registration;
        this.callsign = callsign;
        this.opIcao = opIcao;
        this.fullCallsign = fullCallsign;
        this.model = model;
        this.positions = positions;
    }


    public get dataItemType(): DataItemType {
        return DataItemType.traffic;
    }


    public clone(): Traffic {
        const newPositions: TrafficPosition[] = [];
        this.positions.forEach((pos) => newPositions.push(pos.clone()));

        const cloneTraffic = new Traffic(
            this.address,
            this.acType,
            this.acIcao,
            this.registration,
            this.callsign,
            this.opIcao,
            this.fullCallsign,
            this.model,
            newPositions
        );
        cloneTraffic.isDetailsLoaded = this.isDetailsLoaded;

        return cloneTraffic;
    }


    public hasPositions(): boolean {
        return (this.positions && this.positions.length > 0);
    }


    public getCurrentPosition(): TrafficPosition {
        if (!this.hasPositions()) {
            return undefined;
        }

        return this.positions[this.positions.length - 1];
    }


    public getCommonName(): string {
        if (this.fullCallsign) {
            return this.fullCallsign;
        } else if (this.callsign && !this.isCallsignEqualsRegistration()) {
            return this.callsign;
        } else if (this.registration) {
            return this.registration;
        } else {
            return undefined;
        }
    }


    public isCallsignEqualsRegistration(): boolean {
        const regStripped = this.registration ? this.registration.toUpperCase().replace(/[^A-Z0-9]/g, '') : undefined;
        const callStripped = this.callsign ? this.callsign.toUpperCase().replace(/[^A-Z0-9]/g, '') : undefined;

        return regStripped === callStripped;
    }


    public getRotation(): Angle {
        if (!this.positions || this.positions.length < 2) {
            return Angle.createZero();
        }

        const posList = TrafficPosition.get2dPositionsFromList(this.positions);
        const bearPos = TrackFitter.calcApproxBearingPos(posList.slice(-5));

        return bearPos.bearing;
    }
}
