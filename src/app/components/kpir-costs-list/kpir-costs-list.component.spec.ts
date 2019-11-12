import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpirCostsListComponent } from './kpir-costs-list.component';

describe('KpirCostsListComponent', () => {
  let component: KpirCostsListComponent;
  let fixture: ComponentFixture<KpirCostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpirCostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpirCostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
