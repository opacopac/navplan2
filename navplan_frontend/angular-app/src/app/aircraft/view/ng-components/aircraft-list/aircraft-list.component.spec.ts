import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftListComponent} from './aircraft-list.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftListComponent;
    let fixture: ComponentFixture<AircraftListComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftListComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
