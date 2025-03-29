import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrackListTableComponent} from './track-list-table.component';


xdescribe('TrackListComponent', () => {
    let component: TrackListTableComponent;
    let fixture: ComponentFixture<TrackListTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackListTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackListTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
