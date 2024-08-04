import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbTableComponent} from './aircraft-wnb-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftWnbTableComponent;
    let fixture: ComponentFixture<AircraftWnbTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
