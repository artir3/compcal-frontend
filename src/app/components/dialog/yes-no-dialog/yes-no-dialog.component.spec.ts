import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoDialog } from './yes-no-dialog.component';

describe('LogoutComponent', () => {
  let component: YesNoDialog;
  let fixture: ComponentFixture<YesNoDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
