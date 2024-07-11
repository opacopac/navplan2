import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlightrouteCommentsComponent} from './flightroute-comments.component';


xdescribe('FlightrouteContainerComponent', () => {
    let component: FlightrouteCommentsComponent;
    let fixture: ComponentFixture<FlightrouteCommentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlightrouteCommentsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlightrouteCommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
