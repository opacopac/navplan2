import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbComponent} from './aircraft-wnb.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWnbComponent;
    let fixture: ComponentFixture<AircraftWnbComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
