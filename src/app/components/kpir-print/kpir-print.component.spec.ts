import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpirPrintComponent } from './kpir-print.component';

describe('KpirPrintComponent', () => {
  let component: KpirPrintComponent;
  let fixture: ComponentFixture<KpirPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpirPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpirPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
