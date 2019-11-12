import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpirCostsComponent } from './kpir-costs.component';

describe('KpirCostsComponent', () => {
  let component: KpirCostsComponent;
  let fixture: ComponentFixture<KpirCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpirCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpirCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
