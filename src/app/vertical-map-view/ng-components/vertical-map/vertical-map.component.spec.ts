import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VerticalMapComponent} from './vertical-map.component';

describe('VerticalMapComponent', () => {
  let component: VerticalMapComponent;
  let fixture: ComponentFixture<VerticalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
