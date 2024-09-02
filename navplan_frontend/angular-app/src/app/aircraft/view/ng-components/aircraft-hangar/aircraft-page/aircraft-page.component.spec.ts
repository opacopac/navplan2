import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftPageComponent} from './aircraft-page.component';


xdescribe('AircraftListContainerComponent', () => {
    let component: AircraftPageComponent;
    let fixture: ComponentFixture<AircraftPageComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftPageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
