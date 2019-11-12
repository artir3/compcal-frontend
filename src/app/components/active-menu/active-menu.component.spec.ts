import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMenuComponent } from './active-menu.component';

describe('ActiveMenuComponent', () => {
  let component: ActiveMenuComponent;
  let fixture: ComponentFixture<ActiveMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
