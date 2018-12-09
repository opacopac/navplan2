import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {ChartMapPageComponent} from './chart-map-page.component';
import {Component} from '@angular/core';


@Component({selector: 'app-ol-map-container', template: ''})
class MockOlMapContainerComponent {}


describe('ChartMapPageComponent', () => {
    let component: ChartMapPageComponent;
    let fixture: ComponentFixture<ChartMapPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChartMapPageComponent,
                MockOlMapContainerComponent
            ],
            imports: [
                StoreModule.forRoot({}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartMapPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
