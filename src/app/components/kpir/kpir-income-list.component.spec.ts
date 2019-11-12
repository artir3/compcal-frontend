import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { KpirIncomeListComponent } from './kpir-income-list.component';

describe('KpirComponent', () => {
  let component: KpirIncomeListComponent;
  let fixture: ComponentFixture<KpirIncomeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpirIncomeListComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpirIncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
