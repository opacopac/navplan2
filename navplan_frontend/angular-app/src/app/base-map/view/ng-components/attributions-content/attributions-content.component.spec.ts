import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AttributionsContentComponent} from './attributions-content.component';

describe('LayerSelectionComponent', () => {
  let component: AttributionsContentComponent;
  let fixture: ComponentFixture<AttributionsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionsContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
