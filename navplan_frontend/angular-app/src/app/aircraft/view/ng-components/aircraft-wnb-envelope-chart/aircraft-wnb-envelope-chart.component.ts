import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {WnbEnvelopeSvg} from '../../svg/wnb-envelope-svg';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-aircraft-wnb-envelope-chart',
    templateUrl: './aircraft-wnb-envelope-chart.component.html',
    styleUrls: ['./aircraft-wnb-envelope-chart.component.scss']
})
export class AircraftWnbEnvelopeChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() envelope: WnbEnvelope;
    @Input() zeroFuelWnbCoordinate: WnbEnvelopeCoordinate;
    @Input() takeoffWnbCoordinate: WnbEnvelopeCoordinate;
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Input() isEditable: boolean;
    @Output() addEnvelopeCoordinateClicked = new EventEmitter<WnbEnvelopeCoordinate>();
    @Output() editEnvelopeCoordinateClicked = new EventEmitter<WnbEnvelopeCoordinate>();
    @ViewChild('container') container: ElementRef;


    constructor() {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.redrawSvg();
    }


    public redrawSvg() {
        if (!this.container) {
            return;
        }

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


    private onAddCoordinateClicked(coordinates: WnbEnvelopeCoordinate) {
        this.addEnvelopeCoordinateClicked.emit(coordinates);
    }


    private onEditCoordinateClicked(coordinates: WnbEnvelopeCoordinate) {
        this.editEnvelopeCoordinateClicked.emit(coordinates);
    }
}
