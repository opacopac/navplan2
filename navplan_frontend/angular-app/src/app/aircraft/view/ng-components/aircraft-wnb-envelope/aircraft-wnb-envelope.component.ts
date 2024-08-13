import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {WnbEnvelopeSvg} from '../../svg/wnb-envelope-svg';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-aircraft-wnb-envelope',
    templateUrl: './aircraft-wnb-envelope.component.html',
    styleUrls: ['./aircraft-wnb-envelope.component.scss']
})
export class AircraftWnbEnvelope implements OnInit, AfterViewInit, OnChanges {
    @Input() envelope: WnbEnvelope;
    @Input() zeroFuelWnbCoordinate: WnbEnvelopeCoordinate;
    @Input() takeoffWnbCoordinate: WnbEnvelopeCoordinate;
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
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
                this.container.nativeElement.clientHeight
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
