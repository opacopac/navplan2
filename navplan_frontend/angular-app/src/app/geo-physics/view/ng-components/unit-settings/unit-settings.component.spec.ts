import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UnitSettingsComponent} from './unit-settings.component';


xdescribe('MapOverlayGeonameComponent', () => {
    let component: UnitSettingsComponent;
    let fixture: ComponentFixture<UnitSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnitSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
