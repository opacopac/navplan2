import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {FlightMapPageComponent} from './flight-map-page.component';
import {Component} from '@angular/core';


@Component({selector: 'app-ol-map-container', template: ''})
class MockOlMapContainerComponent {}

@Component({selector: 'app-ol-components-container', template: ''})
class MockOlComponentsContainerComponent {}

@Component({selector: 'app-ol-overlay-container', template: ''})
class MockOlOverlayContainerComponent {}

@Component({selector: 'app-search-container', template: ''})
class MockSearchContainerComponent {}

@Component({selector: 'app-zoom-buttons', template: ''})
class MockZoomButtonsComponent {}

@Component({selector: 'app-location-button', template: ''})
class MockLocationButtonsComponent {}

@Component({selector: 'app-traffic-button', template: ''})
class MockTrafficButtonsComponent {}

@Component({selector: 'app-flighttimer', template: ''})
class MockFlightTimerComponent {}


describe('FlightMapPageComponent', () => {
    let component: FlightMapPageComponent;
    let fixture: ComponentFixture<FlightMapPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FlightMapPageComponent,
                MockOlMapContainerComponent,
                MockOlComponentsContainerComponent,
                MockOlOverlayContainerComponent,
                MockSearchContainerComponent,
                MockZoomButtonsComponent,
                MockLocationButtonsComponent,
                MockTrafficButtonsComponent,
                MockFlightTimerComponent
            ],
            imports: [
                StoreModule.forRoot({}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightMapPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
