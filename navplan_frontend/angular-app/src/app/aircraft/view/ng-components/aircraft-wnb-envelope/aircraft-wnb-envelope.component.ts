import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';
import {WnbEnvelopeSvg} from '../../svg/wnb-envelope-svg';


@Component({
    selector: 'app-aircraft-wnb-envelope',
    templateUrl: './aircraft-wnb-envelope.component.html',
    styleUrls: ['./aircraft-wnb-envelope.component.scss']
})
export class AircraftWnbEnvelope implements OnInit, AfterViewInit {
    @Input() envelope: WnbEnvelope;
    @ViewChild('container') container: ElementRef;


    constructor() {
    }


    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.redrawSvg();
    }


    public redrawSvg() {
        if (!this.container) {
            return;
        }

        if (this.envelope) {
            const svg = WnbEnvelopeSvg.create(
                this.envelope,
                this.container.nativeElement.clientWidth,
                this.container.nativeElement.clientHeight
            );

            this.container.nativeElement.innerHTML = svg.outerHTML;
        } else {
            this.container.nativeElement.innerHTML = '';
        }
    }
}
