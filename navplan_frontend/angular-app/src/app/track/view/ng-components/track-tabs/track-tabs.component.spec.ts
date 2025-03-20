import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackTabsComponent} from './track-tabs.component';


xdescribe('AircraftPageComponent', () => {
    let component: TrackTabsComponent;
    let fixture: ComponentFixture<TrackTabsComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [TrackTabsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
