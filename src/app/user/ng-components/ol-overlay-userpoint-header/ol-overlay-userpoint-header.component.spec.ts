import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OlOverlayUserpointHeaderComponent} from './ol-overlay-userpoint-header.component';


xdescribe('OlOverlayUserpointHeaderComponent', () => {
    let component: OlOverlayUserpointHeaderComponent;
    let fixture: ComponentFixture<OlOverlayUserpointHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlOverlayUserpointHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlOverlayUserpointHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
