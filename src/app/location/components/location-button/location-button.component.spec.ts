import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LocationButtonComponent} from './location-button.component';
import {Directive, Input} from '@angular/core';
import {ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {ButtonStatus} from '../../../shared/directives/status-button/status-button.directive';
import {MessageService} from '../../../message/services/message/message.service';
import {BaseMapService} from '../../../base-map/services/base-map.service';
import {LocationService} from '../../services/location.service';
import {TimerService} from '../../../shared/services/timer/timer.service';


@Directive({selector: '[appStatusButton]'})
class StatusButtonStubDirective {
    @Input() iconClass: string;
    @Input() size: ButtonSize;
    @Input() status: ButtonStatus;
}


describe('LocationButtonComponent', () => {
    let component: LocationButtonComponent;
    let fixture: ComponentFixture<LocationButtonComponent>;
    let messageServiceStub: Partial<MessageService>;
    let mapServiceStub: Partial<BaseMapService>;
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
                { provide: BaseMapService, useValue: mapServiceStub },
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
