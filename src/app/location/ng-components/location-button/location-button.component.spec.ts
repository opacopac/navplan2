import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LocationButtonComponent} from './location-button.component';
import {Directive, Input} from '@angular/core';
import {ButtonSize} from '../../../common/directives/button-base/button-base.directive';
import {ButtonStatus} from '../../../common/directives/status-button/status-button.directive';
import {MessageService} from '../../../message/domain-service/message.service';
import {OlBaseMapService} from '../../../base-map/ol-service/ol-base-map.service';
import {LocationService} from '../../domain-service/location.service';
import {TimerService} from '../../../system/domain-service/timer/timer.service';


@Directive({selector: '[appStatusButton]'})
class StatusButtonStubDirective {
    @Input() iconClass: string;
    @Input() size: ButtonSize;
    @Input() status: ButtonStatus;
}


xdescribe('LocationButtonComponent', () => {
    let component: LocationButtonComponent;
    let fixture: ComponentFixture<LocationButtonComponent>;
    let messageServiceStub: Partial<MessageService>;
    let mapServiceStub: Partial<OlBaseMapService>;
    let locationServiceStub: Partial<LocationService>;
    let timerServiceStub: Partial<TimerService>;


    beforeEach(async(() => {
        messageServiceStub = {
        };
        mapServiceStub = {
        };
        locationServiceStub = {
        };
        timerServiceStub = {
        };

        TestBed.configureTestingModule({
            declarations: [
                LocationButtonComponent,
                StatusButtonStubDirective,
            ],
            providers: [
                { provide: MessageService, useValue: messageServiceStub },
                { provide: OlBaseMapService, useValue: mapServiceStub },
                { provide: LocationService, useValue: locationServiceStub },
                { provide: TimerService, useValue: timerServiceStub }
            ],
            imports: []
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(LocationButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
