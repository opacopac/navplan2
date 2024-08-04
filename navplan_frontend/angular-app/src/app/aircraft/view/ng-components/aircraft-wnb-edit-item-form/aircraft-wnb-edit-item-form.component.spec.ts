import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftWnbEditItemFormComponent} from './aircraft-wnb-edit-item-form.component';


xdescribe('EditWaypointFormComponent', () => {
    let component: AircraftWnbEditItemFormComponent;
    let fixture: ComponentFixture<AircraftWnbEditItemFormComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftWnbEditItemFormComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftWnbEditItemFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
