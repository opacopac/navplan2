import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftHangarPageComponent} from './aircraft-hangar-page.component';


xdescribe('AircraftListContainerComponent', () => {
    let component: AircraftHangarPageComponent;
    let fixture: ComponentFixture<AircraftHangarPageComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftHangarPageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftHangarPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
