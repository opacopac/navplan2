import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftDetailsComponent} from './aircraft-details.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftDetailsComponent;
    let fixture: ComponentFixture<AircraftDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftDetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
