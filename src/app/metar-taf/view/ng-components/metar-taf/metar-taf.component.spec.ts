import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MetarTafComponent} from './metar-taf.component';

describe('OlOverlayAirportMetarTafTabComponent', () => {
  let component: MetarTafComponent;
  let fixture: ComponentFixture<MetarTafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetarTafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetarTafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
