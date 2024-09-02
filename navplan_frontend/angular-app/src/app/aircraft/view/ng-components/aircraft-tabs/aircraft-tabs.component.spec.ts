import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AircraftTabsComponent} from './aircraft-tabs.component';


xdescribe('AircraftPageComponent', () => {
    let component: AircraftTabsComponent;
    let fixture: ComponentFixture<AircraftTabsComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AircraftTabsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AircraftTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
