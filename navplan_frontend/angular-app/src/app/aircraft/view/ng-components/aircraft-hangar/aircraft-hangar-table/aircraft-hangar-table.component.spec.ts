import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftHangarTableComponent} from './aircraft-hangar-table.component';


xdescribe('FlightrouteListComponent', () => {
    let component: AircraftHangarTableComponent;
    let fixture: ComponentFixture<AircraftHangarTableComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftHangarTableComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftHangarTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
