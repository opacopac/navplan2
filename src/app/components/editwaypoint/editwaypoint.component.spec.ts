import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditwaypointComponent} from './editwaypoint.component';


describe('EditwaypointComponent', () => {
    let component: EditwaypointComponent;
    let fixture: ComponentFixture<EditwaypointComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditwaypointComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditwaypointComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
