import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchContainerComponent} from './search-container.component';


xdescribe('SearchContainerComponent', () => {
    let component: SearchContainerComponent;
    let fixture: ComponentFixture<SearchContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
