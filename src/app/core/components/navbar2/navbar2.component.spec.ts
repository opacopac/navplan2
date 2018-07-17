
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Navbar2Component } from './navbar2.component';

describe('Navbar2Component', () => {
  let component: Navbar2Component;
  let fixture: ComponentFixture<Navbar2Component>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [Navbar2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
