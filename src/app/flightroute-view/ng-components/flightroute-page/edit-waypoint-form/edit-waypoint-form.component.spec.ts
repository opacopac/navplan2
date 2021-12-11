import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditWaypointFormComponent} from './edit-waypoint-form.component';


xdescribe('EditWaypointFormComponent', () => {
    let component: EditWaypointFormComponent;
    let fixture: ComponentFixture<EditWaypointFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditWaypointFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditWaypointFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
