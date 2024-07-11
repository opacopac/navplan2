import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteNameLoadSaveComponent} from './flightroute-name-load-save.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: FlightrouteNameLoadSaveComponent;
    let fixture: ComponentFixture<FlightrouteNameLoadSaveComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteNameLoadSaveComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteNameLoadSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
