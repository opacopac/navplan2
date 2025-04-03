import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteSaveComponent} from './flightroute-save.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: FlightrouteSaveComponent;
    let fixture: ComponentFixture<FlightrouteSaveComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteSaveComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
