import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {WnbEnvelopeSvg} from '../../svg/wnb-envelope-svg';
import {WnbLonEnvelopeCoordinate} from '../../../domain/model/wnb-lon-envelope-coordinate';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-aircraft-wnb-envelope-chart',
    standalone: true,
    imports: [],
    templateUrl: './aircraft-wnb-envelope-chart.component.html',
    styleUrls: ['./aircraft-wnb-envelope-chart.component.scss']
})
export class AircraftWnbEnvelopeChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() envelope: WnbEnvelope;
    @Input() zeroFuelWnbCoordinate: WnbLonEnvelopeCoordinate;
    @Input() takeoffWnbCoordinate: WnbLonEnvelopeCoordinate;
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Input() isEditable: boolean;
    @Output() addEnvelopeCoordinateClicked = new EventEmitter<WnbLonEnvelopeCoordinate>();
    @Output() editEnvelopeCoordinateClicked = new EventEmitter<WnbLonEnvelopeCoordinate>();
    @ViewChild('container') container: ElementRef;


    constructor() {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    ngOnChanges(): void {
        this.redrawSvg();
    }


    public redrawSvg() {
        if (!this.container) {
            return;
        }

        this.container.nativeElement.innerHTML = '';

        if (this.envelope) {
            const svg = WnbEnvelopeSvg.create(
                this.envelope,
                this.zeroFuelWnbCoordinate,
                this.takeoffWnbCoordinate,
                this.weightUnit,
                this.lengthUnit,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight,
                this.isEditable,
                (coordinates) => this.onAddCoordinateClicked(coordinates),
                (coordinates) => this.onEditCoordinateClicked(coordinates)
            );

            this.container.nativeElement.appendChild(svg);
        }
    }


    private onAddCoordinateClicked(coordinates: WnbLonEnvelopeCoordinate) {
        this.addEnvelopeCoordinateClicked.emit(coordinates);
    }


    private onEditCoordinateClicked(coordinates: WnbLonEnvelopeCoordinate) {
        this.editEnvelopeCoordinateClicked.emit(coordinates);
    }
}
