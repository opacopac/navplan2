import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftDetailsFormComponent} from './aircraft-details-form.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftDetailsFormComponent;
    let fixture: ComponentFixture<AircraftDetailsFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftDetailsFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftDetailsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
