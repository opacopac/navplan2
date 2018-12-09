import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OlOverlayButtonCloseComponent} from './ol-overlay-button-close.component';

xdescribe('MapOverlayButtonCloseComponent', () => {
    let component: OlOverlayButtonCloseComponent;
    let fixture: ComponentFixture<OlOverlayButtonCloseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayButtonCloseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayButtonCloseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
