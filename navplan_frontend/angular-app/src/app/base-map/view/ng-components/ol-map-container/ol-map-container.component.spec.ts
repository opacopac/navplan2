import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OlMapContainerComponent} from './ol-map-container.component';
import {StoreModule} from '@ngrx/store';

xdescribe('MapContainerComponent', () => {
    let component: OlMapContainerComponent;
    let fixture: ComponentFixture<OlMapContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OlMapContainerComponent],
            imports: [
                StoreModule.forRoot({}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OlMapContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
