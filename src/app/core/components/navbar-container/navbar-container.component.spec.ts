import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarContainerComponent} from './navbar-container.component';
import {Component} from '@angular/core';
import {StoreModule} from '@ngrx/store';


@Component({selector: 'app-navbar', template: ''})
class MockNavbarComponent {}


xdescribe('NavbarContainerComponent', () => {
    let component: NavbarContainerComponent;
    let fixture: ComponentFixture<NavbarContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NavbarContainerComponent,
                MockNavbarComponent
            ],
            imports: [
                StoreModule.forRoot({}),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
